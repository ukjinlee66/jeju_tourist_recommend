import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';

function Tourlistitem(props) {
    function listClick(e) {
        window.location.href = "/TouristAttractionInfo"
    }

    return (
        <div class="col-lg-6">
            <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">관광지 리스트</h1>
            <div class="tab-class wow fadeInUp" data-wow-delay="0.3s">
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="list-item p-4 mb-4"  onClick={listClick}>
                            <div class="row g-4">
                                <div class="col-md-4 d-flex align-items-start">
                                    <img class="img-list" src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/6dTBQAAJW6QLbLUaneCZWL3Vhf4.jpg" />
                                </div>
                                <div class="col-md-8">
                                    <h3 class="text-left">관광지 명</h3>
                                    <p class="list-p">관광지는 어쩌고 저쩌고 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12121212</p>
                                </div>
                            </div>
                        </div>
                        <div class="list-item p-4 mb-4"  onClick={listClick}>
                            <div class="row g-4">
                                <div class="col-md-4 d-flex align-items-start">
                                    <img class="img-list" src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/6dTBQAAJW6QLbLUaneCZWL3Vhf4.jpg" />
                                </div>
                                <div class="col-md-8">
                                    <h3 class="text-left">관광지 명</h3>
                                    <p class="list-p">관광지는 어쩌고 저쩌고 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12121212</p>
                                </div>
                            </div>
                        </div>
                        <div class="list-item p-4 mb-4"  onClick={listClick}>
                            <div class="row g-4">
                                <div class="col-md-4 d-flex align-items-start">
                                    <img class="img-list" src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/6dTBQAAJW6QLbLUaneCZWL3Vhf4.jpg" />
                                </div>
                                <div class="col-md-8">
                                    <h3 class="text-left">관광지 명</h3>
                                    <p class="list-p">관광지는 어쩌고 저쩌고 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12121212</p>
                                </div>
                            </div>
                        </div>
                        <div class="list-item p-4 mb-4"  onClick={listClick}>
                            <div class="row g-4">
                                <div class="col-md-4 d-flex align-items-start">
                                    <img class="img-list" src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/6dTBQAAJW6QLbLUaneCZWL3Vhf4.jpg" />
                                </div>
                                <div class="col-md-8">
                                    <h3 class="text-left">관광지 명</h3>
                                    <p class="list-p">관광지는 어쩌고 저쩌고 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사12121212</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tourlistitem;