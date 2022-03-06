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
    return st

##########################file open ################################

def open_excel():
    df = pd.read_csv('/Users/youlee/Desktop/jeju_tourist_recommand/Data/tourist.csv', encoding='CP949')
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
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return 'https://blog.naver.com/' + soup.iframe["src"]

def craw_contents(url1):
    #url1 = 'https://blog.naver.com/sowey2004/222649761321'
    url = catch_iframe(url1)
    new_str=""
    response = requests.get(url)
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(response.content, 'html.parser')
        test = soup.select('.se-main-container')
        new_list = []
        for x in range(len(test)):
            dum = test[x].get_text().replace("\u200b",'')
            new_list.append(dum.replace("\n",''))
            new_str = dum.replace("\n",'')
    else :
        print(response.status_code)
    return new_str

if __name__=="__main__":
    #공공데이터의 제목에대한 열(하나의 관광지)만 가지고온다.
    new_list = open_excel()
    for j in new_list:
        # csv 데이터의 한 행을 가져온다. 하나의 제목
        out = navapi(j)
        dum_list = []
        for i in out.get("items"):
            title_name = delete_tag(i.get("title"))
            # 하나의 제목에해당하는 dictionary
            sub_dict = {}
            sub_dict["title"] = delete_tag(i.get("title"))
            sub_dict["postdate"] = delete_tag(i.get("postdate"))
            sub_dict["link"] = delete_tag(i.get("link"))
            sub_dict["contents"] = craw_contents(delete_tag(i.get("link")))
            sub_dict["description"] = delete_tag(i.get("description"))
            sub_dict["source"] = str(j)
            dum_list.append(sub_dict)
        with open("/Users/youlee/Desktop/jeju_tourist_recommand/Data/"+str(j)+".json", 'w', encoding='utf-8') as make_file:
            json.dump(dum_list, make_file, indent="\t", ensure_ascii=False)
        break
