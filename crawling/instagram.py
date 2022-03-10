from tkinter import E
from bs4 import BeautifulSoup
from urllib.parse import quote_plus as qp # 아스키코드로 변환
import json
import time
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

user_id = ""
user_pwd = ""
driver_path = "./chromedriver"
save_path = './data/'
today_date = '20220310'

s = Service('./chromedriver')
driver = webdriver.Chrome(service=s)
driver.set_window_size(1920, 1080) 
login_url = "https://www.instagram.com/accounts/login/"
driver.get(login_url)
driver.implicitly_wait(3)
print("login start")

id_input_form = driver.find_element(By.CSS_SELECTOR, '#loginForm > div > div:nth-child(1) > div > label > input')
pwd_input_form = driver.find_element(By.CSS_SELECTOR, '#loginForm > div > div:nth-child(2) > div > label > input')

try:
    id_input_form.send_keys(user_id)
    time.sleep(3)
    pwd_input_form.send_keys(user_pwd)
    time.sleep(3)
    print("Login Success")

    login_ok_button = driver.find_element(By.CSS_SELECTOR, "#loginForm > div > div:nth-child(3) > button")
    login_ok_button.click()
    time.sleep(3)
except:
    print("Login Fail")

base_url = 'https://www.instagram.com/explore/tags/'
tag = '제주도'
url = base_url + qp(tag)

# url 접속
driver.get(url)
time.sleep(5)

# 첫번째 게시물 클릭
driver.find_element(By.CSS_SELECTOR,'div.v1Nh3.kIKUG._bz0w').click()
time.sleep(5)
count=1
while(True):
    insta_data = []
    count+=1
    for i in range(1000):
        cur_url = driver.current_url
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        id_error = geo_error = date_error = img_error = content_error = hastag_error = like_error = ''
        try:
            # 인스타 id
            insta_id = soup.select_one('a.sqdOP.yWX7d._8A5w5.ZIAjV').text
        except:
            insta_id = ''
            id_error='id_Error'

        try:
            # 지오태그
            insta_geo_tag = soup.select_one('.O4GlU').text
        except:
            insta_geo_tag = ''
            geo_error = 'geo_Error'

        try:
            # 인스타 날짜
            insta_date = soup.select_one('time._1o9PC')['title']
            temp = insta_date.split()
            year = temp[0][:-1]
            month = temp[1][:-1]
            if(len(month)==1):
                month = '0'+month
            day = temp[2][:-1]
            if(len(day)==1):
                day = '0'+day
            temp_insta_date = year+month+day
        except:
            insta_date=''
            date_error = 'date_Error'

        try:
            # 인스타 이미지
            insta_img = soup.select_one('.KL4Bh').img['src']
        except:
            insta_img = ''
            img_error = 'image_Error'

        try:
            # 인스타 게시글
            insta_temp_id = soup.select('a.sqdOP.yWX7d._8A5w5.ZIAjV')[1].text
            if(insta_temp_id==insta_id):
                insta_content = soup.select_one('span._7UhW9.xLCgt.MMzan.KV-D4.se6yk.T0kll').text
        except:
            insta_content = ''
            content_error = 'content_Error'

        try:
            # 해쉬 태그
            insta_temp_id = soup.select('a.sqdOP.yWX7d._8A5w5.ZIAjV')[1].text
            if(insta_temp_id==insta_id):
                temp_insta_hashtags = soup.select('a.xil3i')
                insta_hashtags = [tag.text.replace('#','') for tag in temp_insta_hashtags]
        except:
            insta_hashtags=[]
            hashtag_error = 'insta_tag Error'

        try:
            # 좋아요 개수
            insta_like = soup.select_one('div._7UhW9.xLCgt.qyrsm.KV-D4.fDxYl.T0kll').span.text
        except:
            insta_like = ''
            like_error = 'insta_like Error'
        
        temp_data = {"id":insta_id,
                    "geo_tag":insta_geo_tag,
                    "date":insta_date,
                    "img_url":insta_img,
                    "content":insta_content,
                    "hash_tag":insta_hashtags,
                    "like":insta_like,
                    "url":cur_url}
        if(temp_insta_date==today_date):
            insta_data.append(temp_data)
        print(f'{i+1}번째 게시글 크롤링 완료 : ', id_error, geo_error, date_error, img_error, content_error, hastag_error, like_error, datetime.now())
        try:
            driver.find_element(By.CSS_SELECTOR,'div.l8mY4.feth3').click()
        except:
            print(f"크롤링 종료:{datetime.now()}")
            with open(f'{save_path}instagram_{today_date}_{count}.json','w', encoding='utf-8') as f:
                json.dump(insta_data, f, indent="\t", ensure_ascii=False)
            # 결과값 저장
            driver.quit()
            quit()
        time.sleep(5)

    with open(f'{save_path}instagram_{today_date}_{count}.json','w', encoding='utf-8') as f:
        json.dump(insta_data, f, indent="\t", ensure_ascii=False)
# driver.close()
