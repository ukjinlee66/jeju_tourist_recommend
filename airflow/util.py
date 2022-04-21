from datetime import datetime,timedelta

def get_today_date(execution_date):
    ex_year = int(execution_date[:4])
    ex_month = int(execution_date[4:6])
    ex_day = int(execution_date[6:8])
    ex_hour = int(execution_date[9:11])
    ex_min = int(execution_date[12:14])
    today_date = (datetime(ex_year,ex_month,ex_day,ex_hour,ex_min) - timedelta(1)).strftime('%Y%m%d_%H:%M:%S')
    today_date = today_date[:8]
    return today_date