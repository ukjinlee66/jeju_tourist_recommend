import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

function Footer(props) {
    return (
        <div class="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
            <div class="container py-5">
                <div class="row g-5">
                    <div class="col-lg-2">
                        <h5 class="text-white mb-4">Youkjin Lee</h5>
                        <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Incheon</p>
                        <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>010-7208-0753</p>
                        <p class="mb-2"><i class="fa fa-envelope me-3"></i>ukjinlee66@naver.com</p>
                        <a class="btn btn-outline-light btn-social" href="https://github.com/ukjinlee66"><i class="fab fa-github"></i></a>
                    </div>
                    <div class="col-lg-2">
                        <h5 class="text-white mb-4">Yongkwang Lee</h5>
                        <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Incheon</p>
                        <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>010-8854-4614</p>
                        <p class="mb-2"><i class="fa fa-envelope me-3"></i>sksda4614@naver.com</p>
                        <a class="btn btn-outline-light btn-social" href="https://github.com/dldydrhkd"><i class="fab fa-github"></i></a>
                    </div>
                    <div class="col-lg-2">
                        <h5 class="text-white mb-4">Taejun Park</h5>
                        <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Seoul</p>
                        <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>010-4299-9247</p>
                        <p class="mb-2"><i class="fa fa-envelope me-3"></i>hahxowns@gmail.com</p>
                        <a class="btn btn-outline-light btn-social" href="https://github.com/ih-tjpark"><i class="fab fa-github"></i></a>
                    </div>
                    <div class="col-lg-2">
                        <h5 class="text-white mb-4">Geonwoo Gwon</h5>
                        <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Wonju</p>
                        <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>010-4693-3315</p>
                        <p class="mb-2"><i class="fa fa-envelope me-3"></i>kkw2048@daum.net</p>
                        <a class="btn btn-outline-light btn-social" href="https://github.com/Geonw00"><i class="fab fa-github"></i></a>
                    </div>
                    <div class="col-lg-4">
                        <h5 class="text-white mb-4">Education Center</h5>
                        <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>1층, 335 효령로 서초1동 서초구 서울특별시</p>
                        <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>02-754-7302</p>
                        <p class="mb-2"><i class="fa fa-envelope me-3"></i>playdata@playdata.io</p>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="copyright">
                    <div class="row">
                        <div class="col-md-8 text-center text-md-start">
                            &copy; ilda, All Right Reserved. 
							Designed By <a class="border-bottom" href="https://htmlcodex.com">HTML Codex</a>,
                            Distributed By <a class="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;