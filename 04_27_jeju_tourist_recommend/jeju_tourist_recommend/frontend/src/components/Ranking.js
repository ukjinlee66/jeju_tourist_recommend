import React, {useState, useEffect, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";

function Ranking(props) {
    const [rankings, setRankings] = useState(['', '', '', '', '']);
    const reqUrl = '/keyword/top5Keyword'

    // 검색어 랭킹 요청
    const getRanking = async () => {
        await axios
            .get(reqUrl)
            .then((res) => setRankings(res.data));
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getRanking()
    }, [])

    // 검색어 랭킹 렌더링
    const oursiteRender = () => {
        const result = [];
        for (let i = 0; i < rankings.length; i++) {
            result.push(
                <Fragment>
                    <li className='list-element'>
                        <a className='list-area'>
                            <em className='rank'>{i + 1}</em>
                            <span className='rank-element' onClick={(e) => window.location.href = "/jeju/TouristAttractionList?search=" + rankings[i]}>{rankings[i]}</span>
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
                <span className='title-span'>실시간 검색어 랭킹</span>
            </strong>
            <hr className='ranking-hr'/>
            <div className='ranking-inner'>
                <ui className='ranking-list'>
                    {oursiteRender()}
                </ui>
            </div>
        </div>
    </div>
    );
}

export default Ranking;