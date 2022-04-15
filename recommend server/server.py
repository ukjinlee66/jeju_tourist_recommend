from flask import Flask, request

import inference
import keyword_inference

app = Flask(__name__)

@app.route('/recommend', methods=['post'])
def recommend():
    return inference.inference(request.form.get('sentence'))

@app.route('/keyRecommend', methods=['post'])
def keyRecommend():
    return keyword_inference.keyword_inference(request.form.get('sentence'))

if __name__ == "__main__":
    # host = "0.0.0.0" aws에서 부여받은 공유 ip로 외부에서 접속 가능
    # 단 port 5000
    app.run(debug=True, host="0.0.0.0", port="5000")
