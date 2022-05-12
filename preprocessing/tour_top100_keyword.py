import pandas as pd
import numpy as np
import itertools
import re

from konlpy.tag import Okt
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from konlpy.tag import Okt



def mmr(doc_embedding, candidate_embeddings, words, top_n, diversity):

    # 문서와 각 키워드들 간의 유사도가 적혀있는 리스트
    word_doc_similarity = cosine_similarity(candidate_embeddings, doc_embedding)

    # 각 키워드들 간의 유사도
    word_similarity = cosine_similarity(candidate_embeddings)

    # 문서와 가장 높은 유사도를 가진 키워드의 인덱스를 추출.
    # 만약, 2번 문서가 가장 유사도가 높았다면
    # keywords_idx = [2]
    keywords_idx = [np.argmax(word_doc_similarity)]

    # 가장 높은 유사도를 가진 키워드의 인덱스를 제외한 문서의 인덱스들
    # 만약, 2번 문서가 가장 유사도가 높았다면
    # ==> candidates_idx = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10 ... 중략 ...]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    # 최고의 키워드는 이미 추출했으므로 top_n-1번만큼 아래를 반복.
    # ex) top_n = 5라면, 아래의 loop는 4번 반복됨.
    for _ in range(top_n - 1):
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)

        # MMR을 계산
        mmr = (1-diversity) * candidate_similarities - diversity * target_similarities.reshape(-1, 1)
        mmr_idx = candidates_idx[np.argmax(mmr)]

        # keywords & candidates를 업데이트
        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    return [words[idx] for idx in keywords_idx]


# 블로그 글 별로 모델 적용 후 키워드 추출
def keyword(content):
    try:
        result=''
        tokenized_doc = okt.pos(content)
        global stop_word
        #print(tokenized_doc)
        tokenized = ' '.join([w for w,t in tokenized_doc if  t not in ['Verb'] and w not in stop_word])


        count = CountVectorizer().fit([tokenized]) 
        candidates = count.get_feature_names()

        doc_embedding = model.encode([content])
        candidate_embeddings = model.encode(candidates)
        result = ','.join(mmr(doc_embedding, candidate_embeddings, candidates, top_n=20, diversity=0.5))
    except Exception as e:
        print(e)
        print(content)
    return result

model = SentenceTransformer('sentence-transformers/xlm-r-100langs-bert-base-nli-stsb-mean-tokens')
okt = Okt()

df = pd.read_parquet('after_preprocessing.parquet')

result_df = pd.DataFrame(columns=['source','content','postdate','platform','keyword'])

li = ['아르떼뮤지엄','산방산','누피가든','함덕해수욕장','사계해변','섭지코지','도두동 무지개 해안도로','협재해수욕장','동백포레스트','9.81 파크',
 '원동','엉덩물계곡','새별오름','구좌해안로','도치돌 알파카목장','한라산 아래 첫 마을','곶자왈','쇠소깍', '송악산','윈드1947 카트 테마파크','뽀로로&타요 테마파크 제주','탑동','이호테우해수욕장',
 '판포포구','용머리해안','백록담','신화테마파크','도두봉','삼양해수욕장','서귀다원','카멜리아힐','안돌오름','광치기해변','비자림',
 '사려니숲길','사진놀이터','관음사','비양도','김녕 청굴물','신창풍차해안도로','가파도','수월이못','해맞이해안로','제주센트럴파크',
 '서귀포해안','중문색달해수욕장','금악오름(왕매)','쁘램 요가','함덕카페거리','브릭캠퍼스','곽지해수욕장','용두암','제주 카카오캠핑','닭머르해안길','금능해수욕장','노을해안로','아침미소목장','서우봉','휴림','도두해안도로',
 '제주토종흑염소목장','취다선리조트','휴애리 자연생활공원','액티브파크','천지연폭포','화조원','민속해안로','김택화>미술관','석부작박물관',
 '오조포구','바이나흐튼 크리스마스 박물관','이호테우말등대','평대해변','법환포구','이상한 나라의 앨리스','제주카약','제주도립김창열미술관',
 '혼인지','정방폭포','한라산영실코스','포토갤러리 자연사랑미술관','오설록티뮤지엄','막숙','소천지','신양섭지해수욕>장','목장카페 드르쿰다',
 '이로이로공방','수월봉','신화워터파크','제주제트','김녕해수욕장','애월한담해안산책로','수산저수지','주상절리대(중>문대포해안)','톨칸이',
 '에코랜드 테마파크','성산일출봉(UNESCO 세계자연유산)','천아숲길 천아계곡','종달리수국길','녹산로유채꽃길']
 
li=li[:25]
for i,s in enumerate(li):
    print(len(li),'/',i+1)
    print(s)
    s_re = re.sub('[^-가-힣0-9]',' ',s)
    stop_word = ['있는','있고','있으니','입니다.','이렇게','있을','제주특별자치도',s,s_re.replace(' ','')]
    stop_word.extend(s_re.split(' '))
    
    keyword_df = df.loc[df['source']==s].copy()
    keyword_df['keyword'] = keyword_df['content'].map(keyword)
    result_df = result_df.append(keyword_df,ignore_index=True)



result_df.to_parquet("keybert_keyword1.parquet",compression='gzip')


