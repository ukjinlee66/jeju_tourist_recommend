import React, {Fragment, useEffect, useState}from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function Tourinfoitem(props) {

    // 상세 페이지 출력 관광지 정보 
    const [tourSpot, setTourSpot] = useState()

    const reqUrl = '';

    // 한글깨지는 현상 방지위해 decodeURI사용(관광지명)
    let getValue = decodeURI(window.location.search.split('=')[1]);

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(async () => {
        console.log(getValue);
        const params = {searchValue: {getValue}};
        const response = await axios.get(reqUrl, {params});
        setTourSpot(response.data)
    }, [])

    return (
        <Fragment>
            <div class="d-flex align-items-center">
                <div class="text-left h3">관광지 명</div>
            </div>
            <hr/>
            <div class="row g-3">
                <img class="detail-img col-md-4 mb-3" src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/6dTBQAAJW6QLbLUaneCZWL3Vhf4.jpg"/>
                <div class="col-md-8">
                    <p class="h5">기본정보</p>
                    <p class="list-p">관광지는 어쩌고 저쩌고 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12121212</p>
                </div>
            </div>
            <hr/>
            <div class="mb-5">
                <p class="h4">상세정보</p>
                <p>가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 </p>
            </div>
        </Fragment>
    );
}

export default Tourinfoitem;