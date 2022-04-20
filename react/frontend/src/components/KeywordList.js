import React, { Fragment, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";

function KeywordList(props) {

    const [keywordList, setKeywordList] = useState([{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''}]);

    const [test, setTest] = useState([{keyword:'하나'},{keyword:'아이와함께 가즈아'},{keyword:'삼'},{keyword:'사'},{keyword:'오'},{keyword:'육'},{keyword:'칠'},{keyword:'팔'},{keyword:'구'},{keyword:'십'},{keyword:'테스트'},{keyword:'요기어때'}]);
    
    const [checkKeywordList, setCheckKeywordList] = useState([])
    const [testResult, setTestResult] = useState('')
    const reqUrl = '/keyword/randomRecommendKeyword'

    let result = ''

    // 키워드 옵션 리스트 요청
    const getKeyword = async () => {
        await axios
            .get(reqUrl)
            .then((res) => setKeywordList(res.data));
    }

    useEffect(() => {
        getKeyword();
    }, [])

    // 체크박스에서 선택된 키워드로 배열 구성
    const getCheckboxValue = (value) => {
        const checkKeyword = checkKeywordList
        if (checkKeyword.indexOf(value) > -1){
            checkKeyword.splice(checkKeyword.indexOf(value), 1)
        }
        else{
            if (checkKeyword.length < 5){
                checkKeyword.push(value)
            }
        }
        setCheckKeywordList(checkKeyword)
        setResultKeyword()
    }

    // 체크박스에서 선택된 키워드로 문자열 구성
    const setResultKeyword = () => {
        let resultStr = ''
        for (let i = 0; i < checkKeywordList.length; i++) {
            if (resultStr == ''){
                resultStr += checkKeywordList[i]
            } else{
                resultStr += ' ' + checkKeywordList[i]
            }
        }
        setTestResult(resultStr)
    }

    // 선택된 키워드 리스트를 확인할 수 있도록 선택 리스트 렌더링
    const selectKeywordRender = () => {
        const renderResult = [];
        for (let i = 0; i < checkKeywordList.length; i++) {
            renderResult.push(
                <Fragment>
                    <button class="select-keyword-btn" value={checkKeywordList[i]} onClick={(event) => getCheckboxValue(event.target.value)}>{checkKeywordList[i]}</button>
                </Fragment>
        );}
        return renderResult;
    };

    // 키워드 리스트를 기반으로 옵션으로 제공할 키워드 체크박스 렌더링
    const ketwordListRender = () => {
        const renderResult = [];
        for (let i = 0; i < keywordList.length; i++) {
            renderResult.push(
                <li className='col-4 keyword-list'>
                    <button class="keyword-btn" value={test[i].keyword} onClick={(event) => getCheckboxValue(event.target.value)}>{test[i].keyword}</button>
                </li>
            );}
        return renderResult;
    };

    // 추천 버튼 클릭 시 값 전달 및 이동
    function btClick(e) {
        window.sessionStorage.setItem('recoKeyword', result);
        window.location.href = "/jeju/TouristAttractionListReco";
    }

    return (
        <div className="container-xxl py-5">
            <div className="container">
                {/* <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">키워드 추천</h1> */}
                <div className="row keyword-basket">
                    <ui className='col-lg-11 row g-4 keyword-section'>
                        {ketwordListRender()}
                    </ui>
                    <div class="col-lg-1 btn-section" data-wow-delay="0.1s">
                        <div class="btn-list">
                            <button type="button" class="btn new-btn" onClick={btClick}>추천</button>
                        </div>
                    </div>
                </div>
                <div className="row g-4 select-keyword">
                    <ui className='col-lg-11 row g-4 select-keyword-section'>
                        {selectKeywordRender()}
                    </ui>
                    <div class="col-lg-1 btn-section" data-wow-delay="0.1s">
                        <div class="btn-list">
                            <button type="button" class="btn btn-dark" onClick={btClick}>추천</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KeywordList;