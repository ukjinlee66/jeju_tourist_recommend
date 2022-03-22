import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';

function KeywordList(props) {
    return (
        <div class="container-xxl py-5">
            <div class="container">
                <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">키워드 추천</h1>
                <div class="row g-4">
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check1" />
                            <label class="form-check-label" for="check1" >
                            키워드1
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check2" />
                            <label class="form-check-label" for="check2" >
                            키워드2
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check3" />
                            <label class="form-check-label" for="check3" >
                            키워드3
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check4" />
                            <label class="form-check-label" for="check4" >
                            키워드4
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check5" />
                            <label class="form-check-label" for="check5" >
                            키워드5
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check6" />
                            <label class="form-check-label" for="check6" >
                            키워드6
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check7" />
                            <label class="form-check-label" for="check7" >
                            키워드7
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check8" />
                            <label class="form-check-label" for="check8" >
                            키워드8
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check9" />
                            <label class="form-check-label" for="check9" >
                            키워드9
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check10" />
                            <label class="form-check-label" for="check10" >
                            키워드10
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-3 offset-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="form-check">
                            <button type="button" class="btn btn-dark">추천</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KeywordList;