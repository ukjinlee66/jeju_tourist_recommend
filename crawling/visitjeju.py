from tkinter import E
from bs4 import BeautifulSoup
from urllib.parse import quote_plus as qp # 아스크코드로 변환
import json
import time
from datetime import datetime
import requests
from bs4 import BeautifulSoup

from selenium.webdriver import Chrome, ChromeOptions
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service


def save(e, readlist,page):
    print(e)
    print(f"크롤링 종료:{datetime.now()}")
    print("page:"+str(page))
    with open('publicData_new2.json','w', encoding='utf-8') as f:
        json.dump(readlist, f, indent="\t", ensure_ascii=False)


driver_path = "./chromedriver.exe"
save_path = './data/'

s = Service('./chromedriver.exe')
driver = webdriver.Chrome(service=s)
driver.set_window_size(1920, 1080) 
url = "https://www.visitjeju.net/kr/detail/list?menuId=DOM_000001718000000000&cate1cd=cate0000000002#p35&pageSize=15&sortListType=reviewcnt&viewType=list&isShowBtag&tag"
driver.get(url)
driver.implicitly_wait(3)
print("start")


total_data=[]
base_dic={}

# 이름 변환용 딕셔너리
name_dic = {"상세 정보":"detail_content", "이용 시간":"useable_time", "요금 정보":"charge", "장소 특성": "space_property", "주요목적": "purpose",
            "주요목적 기타":"purpose_etc", "평균 소요 시간":"time_required", "경사도(난이도)":"difficult", "편의시설":"convenience", "기타 상세":"etc_property"}
b_dic = {"detail_content":"", "useable_time":"","charge":"", "space_property":"", "purpose":"", "purpose_etc":"", "time_required":"", "difficult":"", "convenience":"", "etc_property":"" }
# url 접속
driver.get(url)
time.sleep(5)
for page in range(74):
    for num in range(1,16):
        # 첫번째 게시물 클릭
        try:
            base_dic['tour'] = driver.find_element(By.XPATH, f'//*[@id="content"]/div/div[2]/div[5]/ul/li[{num}]/dl/dt/a/p[1]').text

            base_dic['sub_title'] = driver.find_element(By.XPATH, f'//*[@id="content"]/div/div[2]/div[5]/ul/li[{num}]/dl/dt/a/p[3]').text
            base_dic['tag_prev'] = driver.find_element(By.XPATH, f'//*[@id="content"]/div/div[2]/div[5]/ul/li[{num}]/dl/dt/a/p[4]').text
            base_dic['tag_next'] = driver.find_element(By.XPATH, f'//*[@id="content"]/div/div[2]/div[5]/ul/li[{num}]/dl/dt/a/p[5]').text
            base_dic['img'] = driver.find_element(By.XPATH, f'//*[@id="content"]/div/div[2]/div[5]/ul/li[{num}]/dl/dt/a/img').get_attribute('src')
            base_dic['score'] = driver.find_element(By.XPATH, f'//*[@id="content"]/div/div[2]/div[5]/ul/li[{num}]/dl/dt/a/div/p').text
            element=driver.find_element(By.XPATH,f'//*[@id="content"]/div/div[2]/div[5]/ul/li[{num}]/dl/dt/a')
            url = element.get_attribute('href')
            element.click()
            time.sleep(0.2)
            try:
                base_dic['call']=driver.find_element(By.XPATH,'//*[@id="content"]/div[2]/div[1]/div[1]/div[2]/div[5]/div[2]/p[2]').text
            except:
                base_dic['call'] = ''
            key=''
            base_dic.update(b_dic)
        except Exception as e:
            save(e,total_data,page)
            # 결과값 저장
            driver.quit()
            quit()

        for i in range(2,12):
            try:
                key= name_dic[driver.find_element(By.XPATH,f'//*[@id="content"]/div[2]/div[2]/div[2]/div[2]/div[2]/div/dl/dt[{i}]').text]
                base_dic[key] = driver.find_element(By.XPATH,f'//*[@id="content"]/div[2]/div[2]/div[2]/div[2]/div[2]/div/dl/dd[{i}]').text
            except:
                break
        try:

            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            text = soup.select('.real')
            content=''

            for t in text:
                content += ' '+t.text
            print(content)


            base_dic['content'] = content

            print(base_dic)
            total_data.append(base_dic)
            base_dic={}
            driver.back()
            time.sleep(3)
        except Exception as e:
            save(e,total_data,page)
            # 결과값 저장
            driver.quit()
            quit()

    try:
        #print(total_data)
        next_page=driver.find_element(By.XPATH,'//*[@id="content"]/div/div[2]/div[5]/div[1]/div/div/div[4]/button[2]')
        next_page.click()
        time.sleep(3)
    except Exception as e:
        save(e,total_data,page)
        # 결과값 저장
        driver.quit()
        quit()
with open('publicData_new2.json','w', encoding='utf-8') as f:
    json.dump(total_data, f, indent="\t", ensure_ascii=False)

# driver.close()
