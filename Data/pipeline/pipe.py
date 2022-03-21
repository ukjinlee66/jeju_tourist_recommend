import pandas as pd
import json
from pandas import json_normalize

with open("/Users/youlee/Desktop/jeju_tourist_recommand/Data/twitter/twitter_crawling.json","r",encoding="utf-8") as f:
    ddata = json.load(f)
df = pd.DataFrame(ddata)
print(df)