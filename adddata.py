import pymongo
import random
from bson.objectid import ObjectId as oid
from datetime import datetime, timedelta

def get_ln2_collection():
    db = pymongo.Connection().ln2db
    db.authenticate('ln2user', 'ln2')
    return db.sandbox

def add_data():
    collection = get_ln2_collection()
    current_pos = datetime.utcnow()
    weight = 25
    temp = 0.1
    dtemp = random.uniform(-1, 1)*1e-7

    now = datetime.utcnow()

    i = 0
    while i < 10000000000:
        weight += random.uniform(-1, 5)*1e-8
        dtemp += 1e-5 if temp < 300 else -1e-5
        temp *= (1 + dtemp)
        current_pos -= timedelta(milliseconds=2)
        collection.insert({'_id': current_pos,
                        'weight': weight,
                        'temp': temp,
                        })
        i += 1
    
if __name__ == "__main__":
    print datetime.utcnow()
    print "time to add 1e9 data: " + str(datetime.utcnow() - now)