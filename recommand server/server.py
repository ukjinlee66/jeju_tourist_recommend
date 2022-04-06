from flask import Flask, request, render_template

import inference

app = Flask(__name__)

@app.route('/', methods=['get'])
def get():
    return render_template('index.html')  


@app.route('/recommand', methods=['POST'])
def insertemp():
    print(request.form.get('keywords'))
    return inference.inference(request.form.get('keywords'))

@app.route('/tospring', methods=['GET'])
def tospring():
    print(request.form.get('keywords'))
    return inference.inference('아이와 함께 갈 수 있는 관광지 추천')


if __name__ == "__main__":
    # host = "0.0.0.0" aws에서 부여받은 공유 ip로 외부에서 접속 가능
    # 단 port 5000
    app.run(debug=True, host="localhost", port="5000")