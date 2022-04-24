import pyarrow
import pandas as pd
from konlpy.tag import Okt
import re
from util import get_today_date

def tokenizer(sentence):
    okt=Okt()

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

def preprocessing(execution_date, naver_save_path, brunch_save_path, naver_brunch_save_path):
    today_date = get_today_date(execution_date)

    # 비짓제주 기준으로 데이터 만듦
    # 비짓제주에 있는 tour리스트 가지고 오기
    # tour이름과 naver & brunch의 source 특문 제거한 이름 기준으로 비교
    # 해당되면 전처리 후 dataframe으로 만들기

    # 브런치 불러온 후 전처리 진행
    brunch_df = pd.read_parquet(f'{brunch_save_path}/{today_date}_brunch.parquet', engine='pyarrow',columns=['source','content','postdate'] )
    brunch_df['platform'] = 'brunch'

    # 네이버 블로그와 합치기 위해 관광지명 전처리
    brunch_df['source'] = brunch_df['source'].apply(lambda x: re.sub('[^-가-힣0-9]', '', x))
    total_df = pd.DataFrame(columns=['source','content','postdate','platform'])
    
    naver_df = pd.read_parquet(f'{naver_save_path}/{today_date}_naver.parquet', engine='pyarrow',columns=['source', 'content','postdate'])
    naver_df['source'] = naver_df['source'].apply(lambda x: re.sub('[^-가-힣0-9]', '', x))
    naver_df['platform'] = 'naver'
    total_df = pd.concat([naver_df,brunch_df], ignore_index=True)
    total_df['content'] = total_df['content'].map(tokenizer)

    total_df.to_parquet(f'{naver_brunch_save_path}/{today_date}_naver_brunch_preprocess.parquet',compression='gzip')

if __name__ == '__main__':
    preprocessing('20220421_03:00:00', './data/naver', './data/brunch', './data/naver_brunch')
