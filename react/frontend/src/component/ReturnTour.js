import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function ReturnTour(props) {

    const [userInput, setUserInput] = useState('');

    const [tourSpot, setTourSpot] = useState('');

    const reqUrl = '/recommand/chatbot';
    
    const getRecoTour = async (sentence) => {
        await axios
            .get(reqUrl, {
                params: {
                    search: sentence,
                }
            })
            .then((res) => setTourSpot(res.data));  
    }

    useEffect(() => {
        setUserInput(props.steps[1].value)
        getRecoTour(props.steps[1].value)
    }, [])


    return (
        <div>
            <a className='chatbot-btn' onClick={(e) => window.location.href = "/jeju/TouristAttractionList?search=" + tourSpot}>{tourSpot}? 이건 못 참지</a>
        </div>
    );
}

export default ReturnTour;