import React, {Fragment, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";
function TourinfoTop(props) {

    // 상세 페이지 출력 관광지 정보 
    const [tourSpot, setTourSpot] = useState({source:'', tag_prev:'', img:'https://image.fmkorea.com/files/attach/new2/20210728/3674493/3731487823/3787216388/37dbf32737fa8f62174e3764bae950ab.jpg', sub_title:'', call:'', address:'', detail_content:'' })

    const reqUrl = '/source/lookup';

    // 한 관광지에 대한 상세정보 요청
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

    // 관광지명, 전화번호, 주소, 간단한 정보 등 렌더링
    const tourSpotRender = () => {
        const result = [];
        
        result.push(
            <Fragment>
            <br/>
            <div class="row">
                <img class="detail-img col-lg-5" src={tourSpot.img}/>
                <div class="col-lg-7">
                    <h3>{tourSpot.source}</h3>
                    <p class="text-con">{tourSpot.sub_title}</p>
                    <br/>
                    <p class="mb-2">
                        <i class="fa fa-phone-alt me-3">&nbsp; {tourSpot.call}</i>
                    </p>
                    <p class="mb-2">
                        <i class="fa fa-location-arrow me-3">&nbsp; {tourSpot.address}</i>
                    </p>
                    <p class="mb-2 go-map" onClick={(e) => window.location.href = "/jeju/Maps?tourSpot=" + tourSpot.source}>
                        <i class="fa fa-globe me-3">&nbsp; 경로 안내</i>
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
        <div class="container-xxl info-con" >
            {tourSpotRender()}
        </div>
    );
}

export default TourinfoTop;