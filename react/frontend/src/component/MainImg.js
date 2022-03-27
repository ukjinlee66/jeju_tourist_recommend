import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import OwlCarousel from 'react-owl-carousel'; 
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 

const options = {
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav : true,
    navText : [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>'
    ]
};

function MainImg(props) {
    return (
        <div className="container-fluid p-0">
            <OwlCarousel className="header-carousel" {...options}>
                <div className="owl-carousel-item position-relative">
                    <img className="img-fluid" src="https://api.cdn.visitjeju.net/photomng/thumbnailpath/201810/17/e798d53c-1c8a-4d44-a8ab-111beae96db4.gif
" alt=""/>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" >
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-10 col-lg-8">
                                    <h1 className="display-3 text-white animated slideInDown mb-4">박태준을 국회로</h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-2">박태준1! 박태준! 박태준! 박태준! 박태준!</p>
                                    <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">별풍쏘기</a>
                                    <a href="" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">안쏘기</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="owl-carousel-item position-relative">
                    <img className="img-fluid" src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/6dTBQAAJW6QLbLUaneCZWL3Vhf4.jpg
" alt=""/>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" >
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-10 col-lg-8">
                                    <h1 className="display-3 text-white animated slideInDown mb-4">제주도사진줘벅벅</h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-2">탄핵! 탄핵! 탄핵! 탄핵!</p>
                                    <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Search A Job</a>
                                    <a href="" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Find A Talent</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OwlCarousel>
        </div>     
    );
}

export default MainImg;