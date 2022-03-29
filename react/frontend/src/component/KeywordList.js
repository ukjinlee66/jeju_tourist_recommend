import React, { Fragment, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function KeywordList(props) {

    const [keywordList, setKeywordList] = useState([]);

    let checkKeyword = []

    const reqUrl = '/test/keyword'

    const getKeyword = async () => {
        await axios
            .get(reqUrl)
            .then((res) => setKeywordList(res.data));
    }

    useEffect(() => {
        getKeyword();
    }, [])

    function getCheckboxValue()  {
        checkKeyword = []

        // 선택된 목록 가져오기
        const query = 'input[name="keyword"]:checked';
        const selectedEls = 
            document.querySelectorAll(query);
        
        // 선택된 목록에서 value 찾기
        let result = '';
        selectedEls.forEach((el) => {
            if (result == ''){
                result += el.value
            } else{
                result += ', ' + el.value;
            }
            
          checkKeyword.push(el.value)
        });

        // 출력
        document.getElementById('result').innerText = result;
    }

    const ketwordListRender = () => {
        const result = [];
        console.log(keywordList);
        for (let i = 0; i < 10; i++) {
            result.push(
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={keywordList[i]} id={"check"+i} name='keyword' onClick={getCheckboxValue}/>
                        <label class="form-check-label" for={"check"+i} >
                        {keywordList[i]}
                        </label>
                    </div>
                </div>
            );}
        return result;
    };

    return (
        <div class="container-xxl py-5">
            <div class="container">
                <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">키워드 추천</h1>
                <div class="row g-4">
                    {ketwordListRender()}
                    <div class="col-lg-3 offset-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <button type="button" class="btn btn-dark">추천</button>
                        </div>
                    </div>
                </div>
                <div id='result'></div>
            </div>
        </div>
    );
}

export default KeywordList;