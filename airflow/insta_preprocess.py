import pandas as pd
from datetime import datetime, timedelta
from konlpy.tag import Okt
import pyarrow
from util import get_today_date

def load_data(today_date, save_path):
    insta = pd.read_parquet(f'{save_path}/{today_date}_instagram.parquet',engine='pyarrow')
    return insta

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

def preprocess(insta):
    insta['content'] = insta['content'].map(tokenizer)
    return insta
    
def save_data(df, save_path, today_date):
    df.to_parquet(f'{save_path}/{today_date}_instagram_preprocess.parquet', engine='pyarrow', compression='snappy')

def preprocessing(execution_date, save_path):
    today_date = get_today_date(execution_date)
    insta = load_data(today_date, save_path)
    df = preprocess(insta)
    save_data(df, save_path, today_date)

if __name__ == '__main__':
    preprocessing()