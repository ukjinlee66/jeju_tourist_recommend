from datetime import timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.dummy import DummyOperator
from airflow.utils.dates import days_ago

from spotify_etl import run_spotify_etl
from instagram import insta_crawl

default_args = {
    'owner': 'airflow',
    'depends_on_past' : False,
    'start_date' : days_ago(0,0,0,0,0),
    'email' : ['sksda4614@naver.com'],
    'email_on_failure' : False,
    'email_on_retry' : False,
    'retries' : 0,                              # 실패 시 5번 재시도
    'retry_delay' : timedelta(seconds=20)       # 실패 시 재시도까지 delay 시간
}

dag_crawl = DAG(
    'crawl_dag_id',
    default_args=default_args,
    description='Our first DAG with ETL process!',
    schedule_interval=timedelta(days=1),
)

#시작을 알리는 dummy
task_start = DummyOperator(
    task_id = 'start',
    dag=dag_crawl
)

# 인스타 크롤링
task_crawling_insta = PythonOperator(
    task_id='insta_crawling',
    python_callable = insta_crawl,#just_a_function,          ## 함수 호출
    dag = dag_crawl,
)

# 끝을 알리는 dummy
task_finish = DummyOperator(
    task_id = 'finish',
    trigger_rule = 'all_done',
    dag = dag_crawl
)


task_start >> task_crawling_insta >> task_finish