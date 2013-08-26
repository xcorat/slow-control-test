from datetime import datetime, timedelta
import pymongo
import json

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
    for entry in cursor:
        weight += entry['weight']
        temp += entry['temp']
        
    ret = [weight/num, temp/num]
    #print ret
    return ret
    
def get_datetime(dtstr):
    return datetime.strptime(dtstr.replace('GMT+0000', ''), 
                                '%a %b %d %Y %H:%M:%S (%Z)')