import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function Ranking(props) {
    const [rankings, setRankings] = useState([]);
    const rankingUrl = ''

    const oursiteArr = ["권건우", "롤체실력과비례", "캐링", "이용광"];
    const hotsnsArr = ["핫", "에스엔에스", "키워드", "랭킹"];

    useEffect(async () => {
        const response = await axios.get(rankingUrl);
        setRankings(response.data)
    }, [])

    const oursiteRander = () => {
        const result = [];
        for (let i = 0; i < oursiteArr.length; i++) {
            result.push(
                <div class="row g-4 mb-4 p-4">
                    <h5 class="col-lg-1">{i + 1}</h5>
                    <h5 class="col-lg-11 ">{oursiteArr[i]}</h5>
                </div>
            );}
        return result;
    };

    const hotsnsRander = () => {
        const result = [];
        for (let i = 0; i < hotsnsArr.length; i++) {
            result.push(
                <div class="row g-4 mb-4 p-4">
                    <h5 class="col-lg-1">{i + 1}</h5>
                    <h5 class="col-lg-11 ">{hotsnsArr[i]}</h5>
                </div>
            );}
        return result;
    };

    return (
        <div class="container-xxl py-3">
            <div class="row g-4">
                <div class="col-lg-6">
                    <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">사이트 내 검색어 순위</h1>
                    <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                        <div class="tab-content">
                            <div id="tab-1" class="tab-pane fade show p-0 active">
                                <div>{oursiteRander()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">SNS 실시간 핫 키워드</h1>
                    <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                        <div class="tab-content">
                            <div id="tab-1" class="tab-pane fade show p-0 active">
                                <div>{hotsnsRander()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ranking;