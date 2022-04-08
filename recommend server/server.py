from flask import Flask, request, render_template

import inference

app = Flask(__name__)

@app.route('/', methods=['get'])
def get():
    return render_template('index.html')

@app.route('/recommend', methods=['post'])
def recommend():
    return inference.inference(request.form.get('sentence'))

if __name__ == "__main__":
    # host = "0.0.0.0" aws에서 부여받은 공유 ip로 외부에서 접속 가능
    # 단 port 5000
    app.run(debug=True, host="localhost", port="5000")
