import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';

function Tourinfoitem(props) {
    return (
        <div class="col-lg-6">
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
            <hr/>
            <div class="d-flex align-items-center">
                <div class="text-left h3 mb-3">네이버블로그</div>
            </div>
            <div class="mb-3">
                <p class="h5">블로그1</p>
                <p>가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 </p>
            </div>
            <div class="mb-3">
                <p class="h5">블로그2</p>
                <p>가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 </p>
            </div>
        </div>
    );
}

export default Tourinfoitem;