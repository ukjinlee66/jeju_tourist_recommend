import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function ReturnTour(props) {

    const [tourSpot, setTourSpot] = useState('');

    const reqUrl = '/recommand/chatbot';
    
    // 유저가 입력한 정보를 통해서 KoBERT 기반 추천 요청
    const getRecoTour = async (sentence) => {
        await axios
            .get(reqUrl, {
                params: {
                    search: sentence,
                }
            })
            .then((res) => setTourSpot(res.data));  
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getRecoTour(props.steps[1].value)
    }, [])

    return (
        <div>
            <a className='chatbot-btn' onClick={(e) => window.location.href = "/jeju/TouristAttractionList?search=" + tourSpot}>{tourSpot}? 이건 못 참지</a>
        </div>
    );
}

export default ReturnTour;