import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function KeywordList(props) {

    const [keywordList, setKeywordList] = useState([{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''}]);
    let checkKeyword = []
    let result = ''
    const reqUrl = '/keyword/randomRecommendKeyword'

    // 키워드 옵션 리스트 요청
    const getKeyword = async () => {
        await axios
            .get(reqUrl)
            .then((res) => setKeywordList(res.data));
    }

    useEffect(() => {
        getKeyword();
    }, [])

    // 체크박스에서 선택된 키워드로 문자열 구성
    function getCheckboxValue()  {
        checkKeyword = []

        // 선택된 목록 가져오기
        const query = 'input[name="keyword"]:checked';
        const selectedEls = 
            document.querySelectorAll(query);
        
        // 선택된 목록에서 value 찾기
        result = '';
        selectedEls.forEach((el) => {
            if (result == ''){
                result += el.value
            } else{
                result += ' ' + el.value;
            }
            
          checkKeyword.push(el.value)
        });

        // 출력
        document.getElementById('result').innerText = result;
    }

    // 키워드 리스트를 기반으로 옵션으로 제공할 키워드 체크박스 렌더링
    const ketwordListRender = () => {
        const renderResult = [];
        for (let i = 0; i < 10; i++) {
            renderResult.push(
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={keywordList[i].keyword} id={"check"+i} name='keyword' onClick={getCheckboxValue}/>
                        <label class="form-check-label" for={"check"+i} >
                        {keywordList[i].keyword}
                        </label>
                    </div>
                </div>
            );}
        return renderResult;
    };

    // 추천 버튼 클릭 시 값 전달 및 이동
    function btClick(e) {
        window.sessionStorage.setItem('recoKeyword', result);
        window.location.href = "/jeju/TouristAttractionListReco";
    }

    return (
        <div class="container-xxl py-5">
            <div class="container">
                <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">키워드 추천</h1>
                <div class="row g-4">
                    {ketwordListRender()}
                    <div class="col-lg-3 offset-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <button type="button" class="btn btn-dark" onClick={btClick}>추천</button>
                        </div>
                    </div>
                </div>
                <div id='result'></div>
            </div>
        </div>
    );
}

export default KeywordList;