from konlpy.tag import Mecab
import pandas as pd
import json
from pymongo import MongoClient
from pymongo.cursor import CursorType
import os

path_dir = '/Users/youlee/Desktop/jeju_tourist_recommand/Data/naver'

file_list = os.listdir(path_dir)


# DB Connection
def get_Connection(datas):
    host = "mongodb://15.164.116.162"
    #host = "localhost"
    port = "27017"
    
    # localhost:20717 connection
    conn = MongoClient(host, int(port))

    # mongodb jeju DB create
    db = conn.jeju

    # mongodb naver collection create
    Tour_tourist = db.naver

    Tour_tourist.insert_many(datas)

# 전 처리
def preprocessing():
    # 단일 한개의 리스트로 모든 관광지의 모든 게시글의 정보를 묶는다.
    new_list2 = []

    # 해당 디렉토리의 모든 파일(관광지들)을 읽는다
    for i in file_list:
        file_name = i
        file_name = file_name.replace('.json','')
        with open("/Users/youlee/Desktop/jeju_tourist_recommand/Data/naver/"+i) as json_file:
            json_data = json.load(json_file)

        # 한 관광지에 따른 딕셔너리를 구성한다.
        new_dic = {"source" : file_name, "contents" : []}
        
        for k in json_data:
            new_list = new_dic["contents"]

            # 한 관광지에 따른 각 게시글들을 리스트로 구성한다.
            new_dic2 = {}
            new_dic2["title"] = k['title']
            new_dic2["postdate"] = k['postdate']
            new_dic2["link"] = k['link']
            new_dic2["description"] = k['description']
            new_list.append(new_dic2)
        new_list2.append(new_dic)
    get_Connection(new_list2)
        
# 형태소분석 Mecab library 사용
def del_StopWord(readData):
    morphs = Mecab().pos(readData)

    print('morphs : ' , morphs)
    JOSA = ["JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ", "JX", "JC"]  # 조사
    SIGN = ["SF", "SE", "SSO", "SSC", "SC", "SY"]  # 문장 부호

    TERMINATION = ["EP", "EF", "EC", "ETN", "ETM"]  # 어미
    SUPPORT_VERB = ["VX"]  # 보조 용언
    NUMBER = ["SN"]

    # Remove JOSA, EOMI, etc
    morphs[:] = (morph for morph in morphs if morph[1] not in JOSA + SIGN + TERMINATION + SUPPORT_VERB)
    # Remove length-1 words
    morphs[:] = (morph for morph in morphs if not (len(morph[0]) == 1))
    # Remove Numbers
    morphs[:] = (morph for morph in morphs if morph[1] not in NUMBER)
    # Result pop-up
    result = []
    for morph in morphs:
        result.append(morph[0])

    return result

#print(Mecab().pos('겨울 제주여행!지난 연말, 휴가를 내어 제주도에 다녀왔어요!#제주여행 자체도 오랜만이었지만#겨울제주 는 처음이라 기대에 부풀었었죠~3박 4일의 짧은 일정으로 다녀왔지만정말 다양한 체험을 하며 알차게 보내고 왔어요.기억에 남는 일이 아주 아주 많이 있지만,그 중에서도 #겨울제주여행 이 아니라면절대 보지 못했을 #한라산설경 이가장 기억에 남는 순간이 아닐까 싶은데요!친정엄마와 7세 아들,말 그대로 노약자와 어린이를 동반한 여행에서어떻게 한라산 설경을 봤지?! 하고궁금하신 분들 계시죠?일반적인 등산코스가 아니라차를 타고 갈 수 있는 #천백고지휴게소 에다녀왔기 때문이예요 :)#1100고지휴게소 는이미 알만한 분들은 다 알고 계시던데저는 이번에 지인이 알려줘서 첨 알게된 곳이거든요!제주한달살기를 하고 온 지인이제가 겨울 #제주여행 을 계획하고 있다는 얘길 듣더니제주도에 눈 내렸다는 소식이 들리면바로 천백고지 cctv랑 교통통제상황부터 확인하고통제 풀리는대로 천백고지휴게소로 향하라며..그럼 정말 멋진 한라산 설경을 볼 수 있을 거라고팁을 알려주더라구요!'))

if __name__=="__main__":
    preprocessing()

