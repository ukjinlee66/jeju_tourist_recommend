import pyarrow.parquet as pq
from pyarrow import csv
import pyarrow as pa
import pandas as pd
import os
from hdfs import InsecureClient
import json
import subprocess
import base64
from konlpy.tag import Okt
import re

def toknizer(sentence):
    try:
        morphs = okt.pos(sentence)
        primaryTok = ["Noun","Adjective","Verb","Hashtag","Adverb"]
        morphs = (morp for morp in morphs if morp[1] in primaryTok)
        morphs = (morph for morph in morphs if not (len(morph[0]) == 1))
        result=''
        for morph in morphs:
            if result!='':
                    result+=" "
            result+=morph[0]
    except Exception as e:
        print('Error:',e)
        print('Error:',sentence)
        result = ''
    return result




parquetdir = "/home/hadoop/parquet/"
datadir = "/home/hadoop/"
file_list = os.listdir(parquetdir)

# 비짓제주 기준으로 데이터 만듦
# 비짓제주에 있는 tour리스트 가지고 오기
# tour이름과 naver & brunch의 source 특문 제거한 이름 기준으로 비교
# 해당되면 전처리 후 dataframe으로 만들기

okt=Okt()

visitjeju = "/home/hadoop/mongo/visitJeju.csv"
visit_df = pd.read_csv(visitjeju)
visit_dic ={}

for v in visit_df['tour']:
    temp_name = re.sub('[^-가-힣0-9]', '', v)
    visit_dic[temp_name] = v

# 브런치 불러온 후 전처리 진행
file_brunch = parquetdir +'brunch_jejudata.parquet'
brunch_df = pd.read_parquet( file_brunch, engine='fastparquet',columns=['source','content','postdate'] )
brunch_df = brunch_df.dropna()
brunch_df['platform'] = 'brunch'

# 네이버 블로그와 합치기 위해 관광지명 전처리 
brunch_df['source'] = brunch_df['source'].apply(lambda x: re.sub('[^-가-힣0-9]', '', x))
brunch_list = list(brunch_df['source'].unique())
total_df = pd.DataFrame(columns=['source','content','postdate','platform'])
n=1

try:
    for i in file_list[617:917]:
        
        standard_name = re.sub('[^-가-힣0-9]', '', i)
        print(n,' : ',standard_name)
        n+=1
        if standard_name in visit_dic:
            file_name = parquetdir+i
            print('전처리 진행 : ', standard_name)
            naver_df = pd.read_parquet(file_name,engine='fastparquet',columns=['contents','postdate'])
            naver_df['contents'] = naver_df['contents'].map(toknizer)
            naver_df = naver_df[naver_df['contents']!='']
            naver_df.rename(columns={'contents':'content'}, inplace=True)
            naver_df['platform'] = 'naver'
            print('naver 통과')

            #naver와 brunch 병합
            if standard_name in brunch_list:
                temp_df=naver_df.append(brunch_df[['content','postdate','platform']][brunch_df['source']==standard_name],ignore_index=True)
                temp_df['content']=temp_df['content'].map(toknizer)
                print('brunch통과')

            else:
                temp_df = naver_df

            temp_df['source']=visit_dic[standard_name]
            total_df = total_df.append(temp_df,ignore_index=True)

except Exception as e:
    print(e)
    print(standard_name)
    total_df.to_parquet("preprocessing_new3.parquet",compression='gzip')

total_df.to_parquet("preprocessing_new3.parquet",compression='gzip')

