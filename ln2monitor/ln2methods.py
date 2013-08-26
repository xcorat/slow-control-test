from datetime import datetime, timedelta
import pymongo
import json
import re

from bson.objectid import ObjectId


def get_table(collection, start=None, end=None, numpoints=10):
    """ return a table of data from the collection
        
        kwargs:
        collection -- the collection from which to get data from,
        start -- datetime object marking the start time of the dataset
        end -- datetime object marking the end of the dataset
        numpoints -- number of points expected in the final output table
    """
    if not start:
        start = collection.find().sort('_id', pymongo.ASCENDING)[0]['_id']
    if not end:
        end = collection.find().sort('_id', pymongo.ASCENDING)[100000]['_id']
    print str(start) + ", " + str(end)
    print start.tzinfo
    
    # time interval to average the values over
    interval = (end - start)/numpoints
    current_start = start
    
    data = [["time", "weight", "temp"]]
    
    for i in range(numpoints):
        row  = [(current_start + interval/2).isoformat()]
        #print "time: " + str(ret)
        row.extend(
            get_averages(collection, current_start, current_start+interval)
            )
        current_start += interval
        data.append(row)
    return data
    
def get_averages(collection, start, end):
    weight = 0.0
    temp = 0.0
    cursor = collection.find({'_id': {'$gte': start, '$lt': end}})
    num = cursor.count()
    if num <= 0:
        print "Error: No points found"
        return []
    for entry in cursor:
        weight += entry['weight']
        temp += entry['temp']
        
    ret = [weight/num, temp/num]
    #print ret
    return ret
    
def get_datetime(dtstr):
    m = re.search('GMT([+-])(\d{2})(\d{2}) ', dtstr)
    offset_mins = (int(m.groups()[1]))*60 + int(m.groups()[2])
    # If the time is added, it's a negative the offset, otherwise keep as a 
    #   positive number
    if m.groups()[0] == '+':
        offset_mins *= -1 
    usertime = datetime.strptime(re.sub(r'GMT[+-]\d{4} ', '', dtstr), 
                                '%a %b %d %Y %H:%M:%S (%Z)')
    return usertime + timedelta(minutes=offset_mins)