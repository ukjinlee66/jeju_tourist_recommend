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
    df = pd.read_csv('C:/Users/USER/Desktop/jeju_tourist_recommand/Data/tourist.csv', encoding='CP949')
    new_list = []
    for i in df["제목"]:
        new_list.append(i)
    return new_list


##########################naver API ################################

def navapi(encText, cnt):
    encText = urllib.parse.quote_plus(encText) # 페이지 index도 입력받아서 100~1000까지.
    client_id = "yGkeep3ssHV5dxw0eLKK"
    client_secret = "dgP6ggIAxs"
    #url = "https://openapi.naver.com/v1/search/blog?display=100&query=" + encText + "&start=" + ind
    url = f'https://openapi.naver.com/v1/search/blog?display=100&start={cnt}&query={encText}' # json 결과
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
        return None

############################ 뷰티풀 수프 ############################

def catch_iframe(url):
    try:
        res = requests.get(url)
        soup = BeautifulSoup(res.text, 'html.parser')
        return 'https://blog.naver.com/' + soup.iframe["src"]
    except:
        return ""



def craw_contents(url1):
    #url1 = 'https://blog.naver.com/sowey2004/222649761321'
    url = catch_iframe(url1)
    if url == "":
        return ""
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
        return ""
    return new_str

if __name__=="__main__":
    check1 = False
    #공공데이터의 제목에대한 열(하나의 관광지)만 가지고온다.
    new_list = open_excel()
    for j in new_list:
        print(j,"##########시작##########")
        if j == '제주불빛정원 테마파크':
            check1 = True
        if check1 == False:
            continue
        # csv 데이터의 한 행을 가져온다. 하나의 제목
        out = []
        cnt = -1
        dum_list = []
        for i in range(1,1000,100):
            cnt+=1
            if navapi(j,i) == None:
                break
            out.append(navapi(j,i))
            for i in out[cnt].get("items"):
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
            # 100개의 게시글을 요청했는데도 불구하고 100개보다 적을경우 -> 다음페이지가 존재하지않을경우.
            if len(out[cnt].get("items")) < 100:
                break
            j = j.replace('/','')
        with open("C:/Users/USER/Desktop/jeju_tourist_recommand/Data/naver/"+str(j)+".json", 'w', encoding='utf-8') as make_file:
                json.dump(dum_list, make_file, indent="\t", ensure_ascii=False)
        print("############################")