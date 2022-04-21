import pandas as pd
import json
from datetime import datetime, timedelta
from pymongo import MongoClient
import pyarrow
from util import get_today_date

stop_words = {'제주도 제주', 'Jeju-do', '제주도', '환상의 섬 Jeju Island', 'Jeju Island',
             '푸른섬 제주도', '서울', 'Jeju, Korea', 'Jeju Island, Korea', '부산', 
             '제주도 어딘가', '제주도 제주시', '제주', 'Gwangju, South Korea' 'Jeju City',
             '제주도 여행'}

def mongo_connection(hashtags):
    host = 'mongodb://localhost'
    conn = MongoClient(host, port, username='admin', password='playdata')
    port = 27017
    
    db = conn.jeju
    insta_hashtags = db.insta
    if insta_hashtags.find_one():
        insta_hashtags.drop()
    insta_hashtags.insert_many(hashtags)

def wordcount(file_path):
    insta = pd.read_parquet(file_path, engine='pyarrow')
    geo = {}
    hashtags = []
    for i in insta['geo_tag']:
        geo_tag = i.strip()
        if geo_tag and (not geo_tag in stop_words):
            if not geo_tag in geo:
                geo[geo_tag] = 0
            geo[geo_tag] += 1
    for k,v in geo.items():
        hashtags.append({'keyword':k, 'cnt':v})
    return hashtags

def save_mongo(execution_date, save_path):
    today_date = get_today_date(execution_date)
    file_path = f'{save_path}/{today_date}_instagram.parquet'
    hashtags = wordcount(file_path)
    mongo_connection(hashtags)

if __name__ == '__main__':
    save_mongo('20220420_03:00:00') 