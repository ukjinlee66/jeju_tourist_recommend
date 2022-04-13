import pandas as pd
import numpy as np
from gensim.models import Word2Vec
from gensim.models import KeyedVectors
from konlpy.tag import Okt
from sklearn.metrics.pairwise import cosine_similarity
import json

word2vec_model = KeyedVectors.load_word2vec_format("jeju_word2Vec_model")
keywordDf = pd.read_parquet("top100_keyword.parquet")

def keyword_inference(sentence):
    
    recoTourDf = keywordDf.copy()

    def keyword_recommend(keywords):
        res = ''
        recoTourDf.loc[len(keywordDf)] = ['input', keywords]
        
        # 각 문서들의 벡터 리스트
        document_embedding_list = []

        # 각 문서에 대해서
        for line in recoTourDf['keyword']:
            doc2vec = None
            count = 0
            for word in line.split():
                if word in word2vec_model.wv.vocab:
                    count += 1
                    # 해당 문서에 있는 모든 단어들의 벡터값을 더한다.
                    if doc2vec is None:
                        doc2vec = word2vec_model[word]
                    else:
                        doc2vec = doc2vec + word2vec_model[word]
            
            if doc2vec is not None:
                # 단어 벡터를 모두 더한 벡터의 값을 문서 길이로 나눠준다.
                doc2vec = doc2vec / count
                document_embedding_list.append(doc2vec)
        
        # 코사인 유사도 매트릭스 생성
        cosine_similarities = cosine_similarity(document_embedding_list, document_embedding_list)
        
        tours = recoTourDf['source']

        # 해당 인풋의 인덱스 호출
        indices = pd.Series(recoTourDf.index, index = recoTourDf['source']).drop_duplicates()    
        idx = indices['input']
        
        # 입력된 키워드와 유사한 관광지 5개 추천
        sim_scores = list(enumerate(cosine_similarities[idx]))
        sim_scores = sorted(sim_scores, key = lambda x: x[1], reverse = True)
        sim_scores = sim_scores[1:6]

        tour_indices = [i[0] for i in sim_scores]

        # 전체 데이터 프레임에서 해당 행 추출
        recommend = tours.iloc[tour_indices].reset_index()
        
        forCnt = 0
        for tourlist in recommend['source']:
            if forCnt == 0:
                res = tourlist
                forCnt += 1
            else: 
                res += ' ' + tourlist
           
        return res
    
    res = keyword_recommend(sentence)
    return res
