from bs4 import BeautifulSoup
from urllib.parse import quote_plus as qp # 아스키코드로 변환
import time
from datetime import datetime, timedelta
from selenium import webdriver
from selenium.webdriver.common.by import By
import pandas as pd
import pyarrow
from util import get_today_date

user_id = '아이디'
user_pwd = '비밀번호'

chDict = {'Jan' : '01',
            'Feb' : '02',
            'Mar' : '03',
            'Apr' : '04',
            'May' : '05',
            'Jun' : '06',
            'Jul' : '07',
            'Aug' : '08',
            'Sep' : '09',
            'Oct' : '10',
            'Nov' : '11',
            'Dec' : '12'
            }

def insta_crawl(execution_date, save_path, driver_path):
    today_date = get_today_date(execution_date)
    webdriver_options = webdriver.ChromeOptions()       # 옵션 설정
    webdriver_options.add_argument('headless')          # 창을 띄우지 않고 크롤링
    driver = webdriver.Chrome(driver_path, options=webdriver_options)
    # driver.set_window_size(1920, 1080)                # 창 크기 설정
    login_url = "https://www.instagram.com/accounts/login/"     # 로그인 url
    driver.get(login_url)
    driver.implicitly_wait(3)
    print("login start")

    id_input_form = driver.find_element(By.CSS_SELECTOR, '#loginForm > div > div:nth-child(1) > div > label > input')
    pwd_input_form = driver.find_element(By.CSS_SELECTOR, '#loginForm > div > div:nth-child(2) > div > label > input')

    try:
        id_input_form.send_keys(user_id)            # id 입력
        time.sleep(3)
        pwd_input_form.send_keys(user_pwd)          # 비밀번호 입력
        time.sleep(3)
        print("Login Success")

        login_ok_button = driver.find_element(By.CSS_SELECTOR, "#loginForm > div > div:nth-child(3) > button")
        login_ok_button.click()
        time.sleep(3)
    except:
        print("Login Fail")
        driver.close()

    base_url = 'https://www.instagram.com/explore/tags/'            # 제두도 태그 검색
    tag = '제주도'
    url = base_url + qp(tag)

    # url 접속
    driver.get(url)
    time.sleep(5)

    # 첫번째 게시물 클릭
    driver.find_element(By.CSS_SELECTOR,'div.v1Nh3.kIKUG._bz0w').click()
    time.sleep(5)
    insta_data = []
    for i in range(10):
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

            # mac 환경
            # year = temp[2]
            # month = chDict[temp[0]]
            # day = temp[1][:-1]
            # temp_insta_date = year+month+day

            # AWS 환경
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
            temp_insta_date = ''
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
        
        temp_data = {
            "id":insta_id,
            "geo_tag":insta_geo_tag,
            "date":insta_date,
            "img_url":insta_img,
            "content":insta_content,
            "hash_tag":insta_hashtags,
            "like":insta_like,
            "url":cur_url
        }
        if(temp_insta_date==today_date):
            insta_data.append(temp_data)
        print(f'{i+1}번째 게시글 크롤링 완료 : ', id_error, geo_error, date_error, img_error, content_error, hastag_error, like_error, datetime.now())
        try:
            driver.find_element(By.CSS_SELECTOR,'div.l8mY4.feth3').click()
        except:
            print(f"크롤링 종료:{datetime.now()}")
            df = pd.DataFrame(insta_data)
            df.to_parquet(f'{save_path}/{today_date}_instagram.parquet', engine='pyarrow', compression='snappy')
            driver.quit()
            quit()
        time.sleep(5)
    # with open(f'{save_path}/{today_date}_instagram.json','w', encoding='utf-8') as f:
    #     json.dump(insta_data, f, indent="\t", ensure_ascii=False)
    df = pd.DataFrame(insta_data)
    df.to_parquet(f'{save_path}/{today_date}_instagram.parquet', engine='pyarrow', compression='snappy')
    driver.close()
if __name__ == '__main__':
    insta_crawl('20220420')