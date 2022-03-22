import pandas as pd
import json
import spark
from pandas import json_normalize
from json2parquet import convert_json
import os

path_dir = "/Users/youlee/Desktop/jeju_tourist_recommand/Data/instagram"
file_list = os.listdir(path_dir)
print(file_list)
for i in file_list:
    new_path = os.listdir(path_dir+"/"+i)
    print(new_path)
    for j in new_path:
        file_name = path_dir+'/'+i+"/"+j
        with open(file_name,"r",encoding="utf-8") as f:
            ddata = json.load(f)
        df = pd.DataFrame(ddata)
        df.to_parquet(parquetdir + j+".parquet", compression='gzip')



# parquetdir = "/Users/youlee/Desktop/jeju_tourist_recommand/Data/parquet_test/
# datadir = "/Users/youlee/Desktop/jeju_tourist_recommand/Data/"



# with open(datadir + "twitter/twitter_crawling.json", "r",encoding="utf-8") as f:
#     ddata = json.load(f)
# df = pd.DataFrame(ddata)
# df.to_parquet(parquetdir + "twitteroriginData.parquet", compression='gzip')