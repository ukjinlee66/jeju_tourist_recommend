import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function Ranking(props) {
    const [rankings, setRankings] = useState([]);
    const rankingUrl = '/test'

    useEffect(async () => {
        const response = await axios.get(rankingUrl);
        setRankings(response.data)
    }, [])

    const oursiteRender = () => {
        const result = [];
        for (let i = 0; i < rankings.length; i++) {
            result.push(
                <div class="row g-4 mb-4 p-4">
                    <h5 class="col-lg-1">{i + 1}</h5>
                    <h5 class="col-lg-11 ">{rankings[i]}</h5>
                </div>
            );}
        return result;
    };

    return (
        <div class="col-lg-6">
            <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">사이트 내 검색어 순위</h1>
            <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div>{oursiteRender()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ranking;