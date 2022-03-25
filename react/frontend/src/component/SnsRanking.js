import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function SnsRanking(props) {
    const [snsrankings, setSnsrankings] = useState([]);
    // snsRankUrl = '/test'

    // useEffect(async () => {
    //     const response = await axios.get(snsRankUrl);
    //     setSnsrankings(response.data)
    // }, [])

    // const hotsnsRander = () => {
    //     const result = [];
    //     for (let i = 0; i < snsrankings.length; i++) {
    //         result.push(
    //             <div class="row g-4 mb-4 p-4">
    //                 <h5 class="col-lg-1">{i + 1}</h5>
    //                 <h5 class="col-lg-11 ">{snsrankings[i]}</h5>
    //             </div>
    //         );}
    //     return result;
    // };

    return (
        <div class="col-lg-6">
            <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">SNS 실시간 핫 키워드</h1>
            <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        {/* <div>{hotsnsRander()}</div> */}
                    </div>
                </div>
            </div>
        </div>
);
}

export default SnsRanking;