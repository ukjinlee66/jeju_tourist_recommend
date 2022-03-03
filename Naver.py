import urllib.request
import urllib.parse
import requests
from bs4 import BeautifulSoup
import pandas as pd
import csv
import json
import re

##########################정규표현식 <b> 태그 제거 #################

def delete_tag(st):
    st = re.sub('<b>','',st)
    st = re.sub('</b>','',st)
    print(st)
    return st

##########################file open ################################

def open_excel():
    df = pd.read_csv('C:/Users/USER/Desktop/02.python/jeju/tourist.csv', encoding='CP949')
    new_list = []
    for i in df["제목"]:
        new_list.append(i)
    return new_list


##########################naver API ################################

def navapi(encText):
    print(type(encText))
    encText = urllib.parse.quote_plus(encText) # 페이지 index도 입력받아서 100~1000까지.
    client_id = "mpP6QfRjS7xTImd2Ebbl"
    client_secret = "BQkqTxBoPX"
    #url = "https://openapi.naver.com/v1/search/blog?display=100&query=" + encText + "&start=" + ind
    url = "https://openapi.naver.com/v1/search/blog?display=100&query=" + encText # json 결과
    # url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # xml 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()
    if(rescode==200):
        data = json.load(response)
        return data
    else:
        print("Error Code:" + rescode)

############################ 뷰티풀 수프 ############################

def catch_iframe(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    return 'https://blog.naver.com/' + soup.iframe["src"]

def craw_contents(url1):
    url1 = 'https://blog.naver.com/sowey2004/222649761321'
    url = catch_iframe(url1)
    print('url : ', url)
    response = requests.get(url)
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(response.content, 'lxml')
        test = soup.select('.se-main-container')
        new_list = []
        for x in range(len(test)):
            new_list.append(test[x].get_text().replace("\n",''))
        for i in new_list:
            print(i)
    else : 
        print(response.status_code)
    return new_list

if __name__=="__main__":
    new_list = open_excel()
    for i in new_list:
        out = navapi(i)
        for i in out.get("items"):
            print('**************************************************')
            #print(i) # json의 한 행
            print("TITLE : " , delete_tag(i.get("title")))
            print("POSTDATE : " , delete_tag(i.get("postdate")))
            print("LINK : " , delete_tag(i.get("link")))
            print("DESCRIPTION : " , delete_tag(i.get("description")))
            print('##################################################')
        #print(type(out))
        break