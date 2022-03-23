import pyarrow.parquet as pq
from pyarrow import csv
import pyarrow as pa
import pandas as pd
import os
from hdfs import InsecureClient
import json
import subprocess
import base64

parquetdir = "/home/hadoop/parquet/"
datadir = "/home/hadoop/"

path_dir = datadir+"naver"
file_list = os.listdir(path_dir)
print(file_list)
for i in file_list:
    if i.encode('utf-8', 'replace').decode().find('?') != -1:
        continue
    file_name = path_dir+"/"+i
    print(file_name)
    with open(file_name,"r",encoding="utf8") as f:
        ddata = json.load(f)
