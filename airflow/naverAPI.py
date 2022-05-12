import urllib.request
import urllib.parse
import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import re
from util import get_today_date
import datetime
import time
from fake_useragent import UserAgent
from time import sleep
from multiprocessing import Pool
from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup
import concurrent.futures
import urllib.request  
import requests
import time
from functools import reduce
import operator

today_date = ''

def delete_tag(st):
    st = re.sub('<b>','',st)
    st = re.sub('</b>','',st)
    return st

def open_excel(cur_dir):
    df = pd.read_csv(f'{cur_dir}/tourist.csv', encoding='CP949')
    return df["제목"]

def navapi(encText, cnt):
    encText = urllib.parse.quote_plus(encText)
    client_id = "4m5dQH3SsC6KLlXoXor0"
    client_secret = "XoTmuqiIvO"
    url = f'https://openapi.naver.com/v1/search/blog?display=100&start={cnt}&query={encText}'
    try:
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
            return ""
    except:
        return ""

def catch_iframe(url):
    try:
        res = requests.get(url)
        soup = BeautifulSoup(res.text, 'html.parser')
        return 'https://blog.naver.com/' + soup.iframe["src"]
    except:
        return ""


def craw_contents(args):
    url = catch_iframe(delete_tag(args[0].get("link")))
    tour_name = args[1]
    sub_dict = {}
    sub_dict["title"] = delete_tag(args[0].get("title"))
    sub_dict["postdate"] = delete_tag(args[0].get("postdate"))
    sub_dict["link"] = delete_tag(args[0].get("link"))
    if url == "":
        sub_dict["content"] = ""
    new_str=""
    try:
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
    except:
        pass
    sub_dict["content"] = new_str
    sub_dict["description"] = delete_tag(args[0].get("description"))
    sub_dict["source"] = str(tour_name)
    return sub_dict

def do_process_with_thread_crawl(tour_name):
    dum_list = []
    print(tour_name)
    for i in range(1, 1000, 100):
        out = navapi(tour_name,i)
        if out != "":
            do_thread_crawl(out, dum_list, tour_name, today_date)
        if len(out.get("items")) < 100:
            break
    return dum_list

def do_thread_crawl(urls, dum_list, tour_name, today_date):
    thread_list = []
    with ThreadPoolExecutor(max_workers=8) as executor:
        for url in urls.get("items"):
            if(delete_tag(url.get("postdate"))!=today_date):
                continue
            # 하나의 제목에 해당하는 dictionary
            thread_list.append(executor.submit(craw_contents,[url,tour_name]))
        for execution in concurrent.futures.as_completed(thread_list):
            dum_list.append(execution.result())

def naver_api(execution_date, cur_dir, naver_save_path):
    global today_date
    today_date = get_today_date(execution_date)
    tour_list = open_excel(cur_dir)
    dum_list = []
    start = time.time()
    with Pool(processes=4) as pool:
        temp = pool.map(do_process_with_thread_crawl, tour_list)
    end = time.time()
    sec = (end - start)
    result = datetime.timedelta(seconds=sec)
    result_list = str(datetime.timedelta(seconds=sec)).split(".")
    print(result_list[0],sec)
    dum_list = list(reduce(operator.add, temp))
    if dum_list:
        print(len(dum_list))
        df = pd.DataFrame(dum_list)
        df.to_parquet(f'{naver_save_path}/{today_date}_naver.parquet', engine='pyarrow', compression='snappy')

if __name__ == '__main__':
    naver_api('20220421_03:00:00', '.', './data/naver')