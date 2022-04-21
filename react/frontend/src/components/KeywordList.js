import React, { Fragment, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";

function KeywordList(props) {

    const [keywordList, setKeywordList] = useState([{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''}]);

    const [test, setTest] = useState([{keyword:'하나'},{keyword:'아이와함께 가즈아'},{keyword:'삼'},{keyword:'사'},{keyword:'오'},{keyword:'육'},{keyword:'칠'},{keyword:'팔'},{keyword:'구'},{keyword:'십'},{keyword:'테스트'},{keyword:'요기어때'}]);
    
    const [checkKeywordList, setCheckKeywordList] = useState([])
    const [strResult, setStrResult] = useState('')

    const reqUrl = '/keyword/randomRecommendKeyword'
    const testData = [{keyword:'하나'},{keyword:'아이와함께 가즈아1'},{keyword:'삼1'},{keyword:'사1'},{keyword:'오1'},{keyword:'육1'},{keyword:'칠1'},{keyword:'팔'},{keyword:'구'},{keyword:'십'},{keyword:'테스트'},{keyword:'요기어때'}]

    // 키워드 옵션 리스트 요청
    const getKeyword = async () => {
        await axios
            .get(reqUrl)
            .then((res) => setKeywordList(res.data));
    }

    useEffect(() => {
        getKeyword();
    }, [])

    // 키워드 리스트가 변할때마다 실행되는 함수
    useEffect(() => {
        console.log(test)
        setStyleColor()
    }, [test])

    // 새로고침시 선택된 키워드는 css 유지, 아닐시 초기화
    const setStyleColor = () => {
        for (let i = 0; i < keywordList.length; i++) {
            const x = document.getElementById('keyword'+i);
            if (checkKeywordList.indexOf(document.getElementById('keyword'+i).value) > -1){
                x.style.borderColor = "var(--primary)";
                x.style.color = "var(--primary)";
            }
            else{
                x.style.borderColor = "#d9d8d8";
                x.style.color = "#06113C";
            }
        }
    }

    // 체크박스에서 선택된 키워드로 배열 구성
    const getCheckboxValue = (value, id) => {
        const checkKeyword = checkKeywordList
        const idx = checkKeyword.indexOf(value)
        const x = document.getElementById(id);       
        if (idx > -1){
            checkKeyword.splice(idx, 1)
            if (x.style.borderColor == "var(--primary)"){
                x.style.borderColor = "#d9d8d8";
                x.style.color = "#06113C";
            }
            else{
                x.style.borderColor = "var(--primary)";
                x.style.color = "var(--primary)";
            }
        }
        else{
            if (checkKeyword.length < 5){
                checkKeyword.push(value)
                if (x.style.borderColor == "var(--primary)"){
                    x.style.borderColor = "#d9d8d8";
                    x.style.color = "#06113C";
                }
                else{
                    x.style.borderColor = "var(--primary)";
                    x.style.color = "var(--primary)";
                }
            }
            else{
                alert('최대 5개의 키워드만 선택할 수 있습니다.')
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
        setStrResult(resultStr)
    }

    // 선택된 키워드 리스트를 확인할 수 있도록 선택 리스트 렌더링
    const selectKeywordRender = () => {
        const renderResult = [];
        for (let i = 0; i < checkKeywordList.length; i++) {
            renderResult.push(
                <Fragment>
                    <button class="select-keyword-btn" value={checkKeywordList[i]} onClick={(event) => getCheckboxValue(event.target.value)}>#{checkKeywordList[i]}</button>
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
                    <button id={"keyword"+i} class="keyword-btn" value={test[i].keyword} onClick={(event) => getCheckboxValue(event.target.value, event.target.id)}>#{test[i].keyword}</button>
                </li>
            );}
        return renderResult;
    };

    // 추천 버튼 클릭시 값 전달 및 이동
    function btClick(e) {
        window.sessionStorage.setItem('recoKeyword', strResult);
        window.location.href = "/jeju/TouristAttractionListReco";
    }

    // 새로고침 버튼 클릭시 
    const refreshKeyword = () => {
        // await axios
        //     .get(reqUrl)
        //     .then((res) => setKeywordList(res.data));
        setTest(testData)
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
                            <i class="bi bi-arrow-clockwise fa-2x refresh-icon" onClick={refreshKeyword}></i>
                        </div>
                    </div>
                </div>
                <div className="row g-4 select-keyword">
                    <ui className='col-lg-11 row g-4 select-keyword-section'>
                        {selectKeywordRender()}
                    </ui>
                    <div class="col-lg-1 btn-section" data-wow-delay="0.1s">
                        <div class="btn-list">
                            <button type="button" class="recommend-btn" onClick={btClick}>추천</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KeywordList;