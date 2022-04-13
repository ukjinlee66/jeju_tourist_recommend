import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function ReturnTour(props) {

    const [tourInfo, setTourInfo] = useState([
        {id:'' ,img:'', source:'', sub_title:''}])

    const infoUrl = '/source/searchBySource'
    const reqUrl = '/recommend/chatbot';

    const getInfoTour = async (tourSpot) => {
        await axios
            .get(infoUrl, {
                params: {
                    source: tourSpot,
                }
            })
            .then((res) => setTourInfo(res.data));  
    }
    
    const getRecoTour = async (sentences) => {
        await axios
            .get(reqUrl, {
                params: {
                    sentence: sentences,
                }
            })
            .then((res) => getInfoTour(res.data));  
    }

    useEffect(() => {
        getRecoTour(props.steps[1].value)
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