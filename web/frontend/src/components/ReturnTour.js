import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";

function ReturnTour(props) {

    const [tourInfo, setTourInfo] = useState([
        {id:'' ,img:'', source:'', sub_title:''}])

    const infoUrl = '/source/searchBySource'
    const reqUrl = '/recommend/chatbot';
    const elasticUrl = '/log/searchKeyword'
    
    // 유저가 입력한 정보를 통해서 KoBERT 기반 추천 요청
    const getRecoTour = async (sentences) => {
        await axios
            .get(reqUrl, {
                params: {
                    sentence: sentences,
                }
            })
            .then((res) => getInfoTour(res.data));  
    }

    const getInfoTour = async (tourSpot) => {
        await axios
            .get(infoUrl, {
                params: {
                    source: tourSpot,
                }
            })
            .then((res) => setTourInfo(res.data));  
    }

    // elasticSearch에 챗봇 추천 log데이터 통신
    const insertElastic = async (searchWord) => {
        await axios
            .get(elasticUrl, {
                params:{
                    search: searchWord,
                    logClass: 'chatbotLog'
                }
            })
            .then();
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getRecoTour(props.steps[1].value)
        insertElastic(props.steps[1].value)
    }, [])

    const output = () => {
        let result;
        if (tourInfo[0].id == '') {
            result = <a>loading...</a>; 
        } else {
            result = <a className='chatbot-btn' onClick={(e) => window.location.href = "/jeju/TouristAttractionInfo?tourSpot=" + tourInfo[0].id}>{tourInfo[0].source}</a>;
        } 
    return result;
    };

    return (
        <div>
            {output()}
        </div>
    );
}

export default ReturnTour;