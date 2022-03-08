import requests
from bs4 import BeautifulSoup
import tweepy
import re
import pandas as pd
import csv
import textcleaner as tc
import json
from datetime import datetime

# 트위터 API에서 발급 받은 key 입력

consumer_key= ""
consumer_secret = ""
access_token = ""
access_token_secret = ""
bearer_Token =""

# 핸들러 생성 및 개인정보 인증요청
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
# 액세스 요청
auth.set_access_token(access_token, access_token_secret)
#twitter API 생성
api = tweepy.API(auth)

wb = pd.read_csv('제주관광공사_제주관광정보시스템(VISIT JEJU).csv',encoding='CP949')

n = 0

def stopWords(text):
    stopword = ['섹트','조건만남','출장안마','19금','오피','성인용품','오피걸','출장마사지','#조건만남','고수익','콜걸','출장안마','출장업소']
    for i in stopword:
        if i in text:
            return True
        else:
            return False
resultJson=[]

try:
    for query in wb['제목'][266:]:
        # n+=1
        # if n>10 :
        #     break
        print(query)
        tourDic={}
        tourDic['source']=query
        tourDic['contents'] = []
        for tweet in tweepy.Cursor(api.search, q="제주 "+query +" -filter:retweets", count=500).items():
            if stopWords(tweet.text):
                continue
            else:
                #print(tweet)
                print(tweet.text)
                date = tweet.created_at
                date = date.strftime("%Y-%m-%d %H:%M")
                print(date)

                tourDic['contents'].append({
                    "content":tweet.text,
                    "postdate":date
                })

        #print(list({v['content']:v for v in tourDic['contents']}.values()))
        # 중복 content 제거
        tourDic['contents']=list({v['content']:v for v in tourDic['contents']}.values())
        if len(tourDic['contents']) > 0 :
            resultJson.append(tourDic)
        #print(resultJson)
        n+=1
    print(resultJson)
    with open("twitter_crawling1.json",'w', encoding="utf-8") as outfile:
        json.dump(resultJson, outfile, ensure_ascii=False, indent="\t")
except :

    print("api 멈춤:"+str(n))
    print(wb['제목'][n])
    #print(resultJson)
    with open("twitter_crawling1.json",'w', encoding="utf-8") as outfile:
        json.dump(resultJson, outfile, ensure_ascii=False, indent="\t")
