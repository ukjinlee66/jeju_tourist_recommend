import requests
import datetime, time, re, csv
from datetime import date
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import pandas as pd
from util import get_today_date

# 관광지명 불러오기
def open_excel(cur_dir):
    df = pd.read_csv(f'{cur_dir}/tourist.csv', encoding='CP949')
    return df["제목"]

def crawling(execution_date, brunch_save_path, driver_path, cur_dir):
    webdriver_options = webdriver.ChromeOptions()
    webdriver_options.add_argument('headless')
    webdriver_options.add_argument('--no-sandbox')
    webdriver_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(driver_path, options=webdriver_options)
    driver.maximize_window()
    driver.implicitly_wait(2)

    driver.get(url='https://brunch.co.kr/')

    today_date = get_today_date(execution_date)
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

    tourlist = open_excel(cur_dir)
    same = 0
    brunch = []
    for searchKeyword in tourlist:
        if searchKeyword[0:2] != '제주':
            searchKey = f'제주{searchKeyword}'
        else:
            searchKey = searchKeyword
        try:
            search_box = driver.find_element_by_xpath(
                '//*[@id="btnServiceMenuSearch"]')
            search_box.click()
            search_bar = driver.find_element_by_xpath(
                '//*[@id="txt_search"]')

            search_bar.clear()
            search_bar.send_keys(searchKey)
            search_bar.send_keys(Keys.RETURN)
            
            lately_bar = driver.find_element_by_xpath(
                '//*[@id="resultArticle"]/div/div[1]/div[1]/span/a[2]')
        except:
            continue
        time.sleep(3)
        try:
            lately_bar.click()
        except:
            pass
        
        last_height = 0
        cnt = 0
        start_page = 1
        lastContent = ''
        dateCheak = True
        error = False
        
        while cnt < 57:
            cnt += 1
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            new_height = driver.execute_script("return document.body.scrollHeight")
            
            if new_height == last_height or dateCheak == False:
                dateCheak = True
                break
            
            last_height = new_height
            print(f"{searchKey} {searchKeyword} brunch-{start_page} ~ {start_page+18}")
            for page in range(start_page, start_page+18):
                try:
                    acting_point = driver.find_element_by_xpath(
                        f'//*[@id="resultArticle"]/div/div[1]/div[2]/ul/li[{page}]/a/div[1]/strong')
                    driver.execute_script("arguments[0].click();", acting_point)
                except:
                    break
                
                try:
                    driver.switch_to.window(driver.window_handles[-1])
                    driver.get_window_position(driver.window_handles[-1])
                    driver.implicitly_wait(2)
                except:
                    error = True
                    break
                
                brunch_date = ''
                try:
                    brunch_date = driver.find_element_by_xpath(
                        '//*[@id="wrapArticleInfo"]/span[4]'
                    )
                    
                    brunch_date = brunch_date.text
                    if '전' in brunch_date:
                        brunch_date = date.today().strftime('%Y%m%d')
                    else:
                        split_brunch_date = brunch_date.split(" ")
                        brunch_date += chDict[split_brunch_date[0]]
                        brunch_date = re.sub('\.', '', brunch_date)
                        brunch_date = re.sub('\w+\s(\d+)\s(\d+)', '\\2\\1', brunch_date)
                    print(today_date, brunch_date)
                    if today_date > brunch_date:
                        print('종료')
                        dateCheak = False
                        driver.close()
                        driver.switch_to.window(driver.window_handles[0])
                        driver.get_window_position(driver.window_handles[0])            
                        break
                    elif today_date != brunch_date:
                        driver.close()
                        driver.switch_to.window(driver.window_handles[0])
                        driver.get_window_position(driver.window_handles[0])
                        continue
                    elif today_date == brunch_date:
                        same+=1
                        print('same')
                except:
                    pass
                
                brunch_content = ''
                try:
                    div_p_elems = driver.find_elements_by_xpath(
                        '/html/body/div[3]/div[1]/div[2]/div[1]/p[@class="wrap_item item_type_text"] | /html/body/div[3]/div[1]/div[2]/div[1]/h4[@class="wrap_item item_type_text"]')
                    for item in div_p_elems:
                        brunch_content += item.text
                    brunch_content = brunch_content.replace('\n', "")
                except:
                    pass

                brunch_title = ''
                try:
                    brunch_title = driver.find_element_by_xpath(
                        '/html/body/div[3]/div[1]/div[1]/div/div[3]/h1'
                    )
                    brunch_title = brunch_title.text.replace('\n', "")
                except:
                    pass

                if brunch_content != '' and lastContent != brunch_content:
                    brunch.append({
                        "title": brunch_title,
                        "postdate": brunch_date,
                        "content": brunch_content,
                        "source": searchKeyword
                    })
                    lastContent = brunch_content
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                driver.get_window_position(driver.window_handles[0])
            if error:
                driver = webdriver.Chrome(driver_path, options=webdriver_options)
                driver.maximize_window()
                driver.implicitly_wait(2)
                driver.get(url='https://brunch.co.kr/')
                error = False
                break
            start_page += 18
    if brunch:
        df = pd.DataFrame(brunch)
        df.to_parquet(f'{brunch_save_path}/{today_date}_brunch.parquet', engine='pyarrow', compression='snappy')
    driver.close()

if __name__ == '__main__':
    crawling('20220419_03:00:00', './data/brunch', './chromedriver', '.')