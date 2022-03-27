import React ,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function Tourlistitem(props) {
    // 현재 페이지 출력 관광지 리스트 
    const [tourList, setTourList] = useState()

    const reqUrl = ''

    // 한글깨지는 현상 방지위해 decodeURI사용(검색어)
    let getValue = decodeURI(window.location.search.split('=')[1]);

    // 처음 렌더링시 한번 실행되는 함수
    // 만약 아래의 요청이 중첩된다면 params초기화 진행해야함.
    useEffect(async () => {
        console.log(getValue);
        const params = {searchValue: {getValue}};
        const response = await axios.get(reqUrl, {params});
        setTourList(response.data)
    }, [])

    const tourlistRender = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                // 출력 관광지 리스트의 관광지 명을 값으로 상세페이지에 보냄
                <div class="list-item p-4 mb-4"  onClick={(e) => window.location.href = "/jeju/TouristAttractionInfo?tourSpot=" + '테스트'+ i}>
                    <div class="row g-4">
                        <div class="col-md-4 d-flex align-items-start">
                            <img class="img-list" src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/6dTBQAAJW6QLbLUaneCZWL3Vhf4.jpg" />
                        </div>
                        <div class="col-md-8">
                            <h3 class="text-left" typeof='text' id='test' >관광지 명</h3>
                            <p class="list-p">관광지는 어쩌고 저쩌고 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12121212</p>
                        </div>
                    </div>
                </div>
            );}
        return result;
    };


    return (
        <div class="col-lg-5">
            <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">관광지 리스트</h1>
            <div class="tab-class wow fadeInUp" data-wow-delay="0.3s">
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        {tourlistRender()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tourlistitem;