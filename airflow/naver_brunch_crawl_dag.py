from datetime import timedelta

import pendulum
from datetime import datetime
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.operators.dummy import DummyOperator

from naverAPI import naver_api
from brunch_crawling import crawling
from naver_brunch_preprocessing import preprocessing

# aws
cur_dir = '/home/hadoop/airflow/dags'
driver_path = '/home/hadoop/airflow/dags/chromedriver'
naver_save_path = '/home/hadoop/airflow/dags/data/naver'
brunch_save_path = '/home/hadoop/airflow/dags/data/brunch'
naver_brunch_save_path = '/home/hadoop/airflow/dags/data/naver_brunch'

# mac
# naver_save_path = '/Users/lyk/airflow/dags/data/naver'
# brunch_save_path = '/Users/lyk/airflow/dags/data/brunch'
# naver_brunch_save_path = '/Users/lyk/airflow/dags/data/naver_brunch'
# driver_path = '/Users/lyk/airflow/dags/chromedriver'
# cur_dir = '/home/hadoop/airflow/dags'


local_tz = pendulum.timezone("Asia/Seoul")      # 한국 시간으로 설정

# 디폴트 파라미터
default_args = {
    'owner': 'lyk',                             # 작업의 owner
    'depends_on_past' : False,
    'start_date' : datetime(2022, 4, 21, tzinfo=local_tz),         # 시작 시간으로 과거로 설정해야함
    'email' : ['sksda4614@naver.com'],
    'email_on_failure' : False,
    'email_on_retry' : False,
    'retries' : 3,                              # 실패 시 3번 재시도
    'retry_delay' : timedelta(seconds=20)       # 실패 시 재시도까지 delay 시간
}

# DAG 정의
dag_crawl = DAG(
    'naver_brunch_crawl_dag_id',
    default_args=default_args,
    description='Crawling DAG with ETL process!',
    schedule_interval= "0 3 * * *",              # 매일 새벽 03시에 인스타 크롤링 시작
)

#시작을 알리는 dummy
task_start = DummyOperator(
    task_id = 'start',                              # task 이름
    dag=dag_crawl
)


# 네이버 API 요청
task_naver_API = PythonOperator(
    op_kwargs={
        "execution_date" : "{{execution_date.in_timezone('Asia/Seoul').strftime('%Y%m%d_%H:%M:%S')}}",            # 실행 시간 설정
        "cur_dir" : cur_dir,
        "naver_save_path" : naver_save_path,
    },
    task_id='naver_api',               # task 이름
    python_callable = naver_api,      # 원하는 함수 호출
    dag = dag_crawl
)


# 브런치 크롤링
task_brunch_crawling = PythonOperator(
    op_kwargs={
        "execution_date" : "{{execution_date.in_timezone('Asia/Seoul').strftime('%Y%m%d_%H:%M:%S')}}",            # 실행 시간 설정
        "save_path" : brunch_save_path,
        "driver_path" : driver_path,
        "cur_dir" : cur_dir,
    },
    task_id='brunch_crawling',               # task 이름
    python_callable = crawling,      # 원하는 함수 호출
    dag = dag_crawl
)


naver_save_in_lake = f'hdfs dfs -put {naver_save_path}/*naver.parquet /lake/naver'

# 네이버 데이터 하둡에 저장
task_naver_save_in_lake = BashOperator(
    task_id='save_naver_in_hadoop_lake',
    dag=dag_crawl,
    bash_command = naver_save_in_lake
)

brunch_save_in_lake = f'hdfs dfs -put {brunch_save_path}/*brunch.parquet /lake/brunch'

# 브런치 데이터 하둡에 저장
task_brunch_save_in_lake = BashOperator(
    task_id='save_brunch_in_hadoop_lake',
    dag=dag_crawl,
    bash_command = brunch_save_in_lake
)

# 네이버와 브런치 전처리 후 웨어하우스에 저장
task_preprocessing = PythonOperator(
    op_kwargs={
        "execution_date" : "{{execution_date.in_timezone('Asia/Seoul').strftime('%Y%m%d_%H:%M:%S')}}",
        "naver_save_path" : naver_save_path,
        "brunch_save_path" : brunch_save_path,
        "naver_brunch_save_path" : naver_brunch_save_path,
    },
    task_id = 'naver_brunch_preprocessing',
    python_callable = preprocessing,
    dag = dag_crawl
)

save_in_warehouse = f'hdfs dfs -put {naver_brunch_save_path}/*preprocess.parquet /warehouse/naver_brunch'

# 전처리 후 웨어하우스에 저장
task_save_in_warehouse = BashOperator(
    task_id = 'save_in_hadoop_warehouse',
    bash_command = save_in_warehouse,
    dag = dag_crawl
)


# 크롤링한 parquet 파일 삭제
delete_crawling = f'rm -rf {naver_save_path}/*parquet {brunch_save_path}/*parquet {naver_brunch_save_path}/*parquet'


# parquet 삭제
task_delete = BashOperator(
    task_id = 'delete_parquet',
    dag = dag_crawl,
    bash_command = delete_crawling
)


# 끝을 알리는 dummy
task_finish = DummyOperator(
    task_id = 'finish',                     # task 이름
    trigger_rule = 'all_done',
    dag = dag_crawl
)


# 의존관계 구성
task_start >> task_naver_API >> task_naver_save_in_lake >> task_preprocessing >> task_save_in_warehouse >> task_delete >> task_finish
task_start >> task_brunch_crawling >> task_brunch_save_in_lake >> task_preprocessing >> task_save_in_warehouse >> task_delete >> task_finish