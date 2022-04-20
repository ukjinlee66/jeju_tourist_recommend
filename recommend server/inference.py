import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np

from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model

from transformers import AdamW
from myclass import BERTClassifier
from myclass import BERTDataset

# 모델 파라미터 설정
# 토큰의 최대 길이라고 생각
max_len = 64
# 몇 개의 샘플들을 예측해보고 가중치를 업데이트 할 지 설정
# 아래와 같이 배치 사이즈가 64인 경우 데이터 64개 마다 예측한 것을 실제 값과 비교한다
batch_size = 64
warmup_ratio = 0.1
# epoch 횟수는 모델이 전체 데이터셋을 훈련시킬 횟수를 의미한다.
num_epochs = 10
max_grad_norm = 1
log_interval = 200
# learning_rate 값이 너무 크면 원하는 값에 도달하기 힘들고, 너무 작으면 학습기간이 오래 걸린다.
learning_rate =  5e-5

device = torch.device("cpu") # pytorch 에서 cpu 사용 선택, cpu 환경에서 모델 구동시

# 사전 훈련된 kobert model 불러옴
bertmodel, vocab = get_pytorch_kobert_model()

model = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)

learning_rate =  5e-5
# optimizer와 schedule 설정
no_decay = ['bias', 'LayerNorm.weight']
optimizer_grouped_parameters = [
    {'params': [p for n, p in model.named_parameters() if not any(nd in n for nd in no_decay)], 'weight_decay': 0.01},
    {'params': [p for n, p in model.named_parameters() if any(nd in n for nd in no_decay)], 'weight_decay': 0.0}
]

# optimizer = 전체 데이터 셋의 실제 결과와 모델이 예측한 값 간의 차이가 효율적으로 좁혀질 수 있도록 최적화해주는 역할
# transform에서 제공하는 AdamW optimizer 사용
optimizer = AdamW(optimizer_grouped_parameters, lr=learning_rate)
# 예측값과 실제값의 오차인 손실함수는 pytorch에서 제공하는 다중분류를 위한 대표적인 손실함수인 torch.nn.CrossEntropyLoss 사용
loss_fn = nn.CrossEntropyLoss()
# 전체 모델 불러오기(cpu 환경으로 사용할 때)

model.load_state_dict(torch.load('top100_jeju_model_state_dict_v2.pt', map_location='cpu'))
# kobert에서 vocab을 통해서 토큰화 진행
# 앞에 클래스를 선언해줘야 모델 실행 가능

# kobert에서 vocab을 통해서 토큰화 진행
tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

# 테스트 함수 
def predict(predict_sentence):
    sources = ['아르떼뮤지엄','산방산','스누피가든','함덕해수욕장','사계해변','섭지코지','도두동 무지개 해안도로',
                '협재해수욕장','동백포레스트','9.81 파크','원동','엉덩물계곡','새별오름','구좌해안로','도치돌 알파카목장',
                '한라산 아래 첫 마을','곶자왈','쇠소깍','송악산','윈드1947 카트 테마파크','뽀로로&타요 테마파크 제주',
                '탑동','이호테우해수욕장','판포포구','용머리해안','백록담','신화테마파크','도두봉','삼양해수욕장','서귀다원',
                '카멜리아힐','안돌오름','광치기해변','비자림','사려니숲길','사진놀이터','관음사','비양도','김녕 청굴물',
                '신창풍차해안도로','가파도','수월이못','해맞이해안로','제주센트럴파크','서귀포해안','중문색달해수욕장',
                '금악오름(왕매)','쁘램 요가','함덕카페거리','브릭캠퍼스','곽지해수욕장','용두암','제주 카카오캠핑',
                '닭머르해안길','금능해수욕장','노을해안로','아침미소목장','서우봉','휴림','도두해안도로','제주토종흑염소목장',
                '취다선리조트','휴애리 자연생활공원','액티브파크','천지연폭포','화조원','민속해안로','김택화미술관','석부작박물관',
                '오조포구','바이나흐튼 크리스마스 박물관','이호테우말등대','평대해변','법환포구','이상한 나라의 앨리스','제주카약',
                '제주도립김창열미술관','혼인지','정방폭포','한라산영실코스','포토갤러리 자연사랑미술관','오설록티뮤지엄','막숙','소천지',
                '신양섭지해수욕장','목장카페 드르쿰다','이로이로공방','수월봉','신화워터파크','제주제트','김녕해수욕장','애월한담해안산책로',
                '수산저수지','주상절리대(중문대포해안)','톨칸이','에코랜드 테마파크','성산일출봉(UNESCO 세계자연유산)','천아숲길 천아계곡',
                '종달리수국길','녹산로유채꽃길']

    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)
    
    # 평가 모드
    model.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)

        test_eval=[]
        
        # 학습위해 변환한 분류값 초기 분류값으로 변환
        for i in out:
            logits=i
            logits = logits.detach().cpu().numpy()

            test_eval.append(sources[np.argmax(logits)])

        return test_eval[0]

def inference(sentence):
    res = predict(sentence)
    return res
