import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm import tqdm, tqdm_notebook

from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model

from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup

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

# 학습에 사용할 데이터 셋 클래스 선언
class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len,
                pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))

    def __len__(self):
        return (len(self.labels))


 # 분류에 사용할 모델 클래스 선언
class BERTClassifier(nn.Module):
    def __init__(self,
                bert,
                hidden_size = 768,
                # num_classes는 카테고리의 개수를 의미한다. (현재 데이터셋의 경우 3개의 분류로 데이터셋이 구성되어 있음)
                num_classes=9,
                dr_rate=None,
                params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate
                
        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)
    
    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)
        
        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device))
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)