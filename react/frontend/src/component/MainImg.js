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
                </div>
                <div className="owl-carousel-item position-relative">
                    <img className="img-fluid" src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/6dTBQAAJW6QLbLUaneCZWL3Vhf4.jpg
" alt=""/>
                </div>
            </OwlCarousel>
        </div>     
    );
}

export default MainImg;