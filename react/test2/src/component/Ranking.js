import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';

function Ranking(props) {
    return (
        <div class="container-xxl py-3">
            <div class="row g-4">
                <div class="col-lg-6">
                    <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">사이트 내 검색어 순위</h1>
                    <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                        <div class="tab-content">
                            <div id="tab-1" class="tab-pane fade show p-0 active">
                                <div class="job-item p-4 mb-4">
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                            <h5 class="mb-3">1</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="job-item p-4 mb-4">
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                            <h5 class="mb-3">2</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="job-item p-4 mb-4">
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                            <h5 class="mb-3">3</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="job-item p-4 mb-4">
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                            <h5 class="mb-3">4</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">SNS 실시간 핫 키워드</h1>
                    <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                        <div class="tab-content">
                            <div id="tab-1" class="tab-pane fade show p-0 active">
                                <div class="job-item p-4 mb-4">
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                            <h5 class="mb-3">1</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="job-item p-4 mb-4">
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                            <h5 class="mb-3">2</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="job-item p-4 mb-4">
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                            <h5 class="mb-3">3</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="job-item p-4 mb-4">
                                    <div class="row g-4">
                                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                            <h5 class="mb-3">4</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ranking;