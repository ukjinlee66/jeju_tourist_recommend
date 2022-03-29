import React, {Fragment, useEffect, useState}from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function Tourinfoitem(props) {

    // 상세 페이지 출력 관광지 정보 
    const [tourSpot, setTourSpot] = useState({tour:'', tag_prev:'', img:'', sub_title:'', content:'', detail_content:''})

    const reqUrl = '/tour/lookup';

    const getInfoItem = async () => {
        console.log(decodeURI(window.location.search.split('=')[1]))
        await axios
            .get(reqUrl, {
                params: {
                    id: decodeURI(window.location.search.split('=')[1])
                }
            })
            .then((res) => setTourSpot(res.data));
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getInfoItem();
    }, [])

    const tourSpotRender = () => {
        const result = [];
        console.log(tourSpot)
        result.push(
            <Fragment>
            <div class="d-flex align-items-center">
                <div class="text-left h3">{tourSpot.tour}</div>
            </div>
            <hr/>
            <div class="row g-3">
                <img class="detail-img col-md-4 mb-3" src={tourSpot.img}/>
                <div class="col-md-7">
                    <p class="h5">기본정보</p>
                    <p class="list-p">{tourSpot.detail_content}</p>
                </div>
            </div>
            <hr/>
            <div class="mb-5">
                <p class="h4">상세정보</p>
                <p>{tourSpot.content}</p>
            </div>
            </Fragment>
        );
        return result;
    };


    return (
        <Fragment>
            {tourSpotRender()}
        </Fragment>
    );
}

export default Tourinfoitem;