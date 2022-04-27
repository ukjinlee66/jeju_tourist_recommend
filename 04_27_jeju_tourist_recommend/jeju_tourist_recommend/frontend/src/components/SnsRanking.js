import React, {useState, useEffect, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";

function SnsRanking(props) {
    const [snsrankings, setSnsrankings] = useState([{keyword:''},{keyword:''},{keyword:''},{keyword:''},{keyword:''}]);

    const reqUrl = '/keyword/instaKeyword'

    // SNS 검색어 랭킹 요청
    const getSnsRanking = async () => {
        await axios
            .get(reqUrl)
            .then((res) => setSnsrankings(res.data));
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getSnsRanking();
    }, [])

    // SNS 검색어 랭킹 렌더링
    const hotsnsRander = () => {
        const result = [];
        for (let i = 0; i < snsrankings.length; i++) {
            result.push(
                <Fragment>
                    <li className='list-element'>
                        <a className='list-area'>
                            <em className='rank'>{i + 1}</em>
                            <span className='rank-element'>{snsrankings[i].keyword}</span>
                        </a>
                    </li>
                </Fragment>
            );}
        return result;
    };

    return (
        <div class="col-lg-3 offset-lg-2">
            <div className='ranking-section'>
                <strong className='ranking-title'>
                    <span className='title-span'>SNS Hot Rank</span>
                </strong>
                <hr className='ranking-hr'/>
                <div className='ranking-inner'>
                    <ui className='ranking-list'>
                        {hotsnsRander()}
                    </ui>
                </div>
            </div>
        </div>
);
}

export default SnsRanking;