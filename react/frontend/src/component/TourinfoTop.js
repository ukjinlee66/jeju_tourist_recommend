import React, {Fragment, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function TourinfoTop(props) {
    // 상세 페이지 출력 관광지 정보 
    const [tourSpot, setTourSpot] = useState({tour:'', tag_prev:'', img:'https://image.fmkorea.com/files/attach/new2/20210728/3674493/3731487823/3787216388/37dbf32737fa8f62174e3764bae950ab.jpg', sub_title:'', call:'', address:'', detail_content:'' })

    const reqUrl = '/tour/lookup';

    const getInfoItem = async () => {
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
        result.push(
            <Fragment>
            <br/>
            <div class="row">
                <img class="detail-img col-lg-5" src={tourSpot.img}/>
                <div class="col-lg-7">
                    <h3>{tourSpot.tour}</h3>
                    <p class="text-con">{tourSpot.sub_title}</p>
                    <br/>
                    <p class="mb-2">
                        <i class="fa fa-phone-alt me-3">&nbsp; {tourSpot.call}</i>
                    </p>
                    <p class="mb-2">
                        <i class="fa fa-location-arrow me-3">&nbsp; {tourSpot.address}</i>
                    </p>
                    <hr/>
                    <i class="fa fa-bullhorn me-3 text-con"></i><br/>
                    <p class="mb-2">{tourSpot.detail_content}</p>
                </div>
            </div>
            </Fragment>
        );
        return result;
    };


    return (
        <div class="container-xxl" >
            {tourSpotRender()}
        </div>
    );
}

export default TourinfoTop;