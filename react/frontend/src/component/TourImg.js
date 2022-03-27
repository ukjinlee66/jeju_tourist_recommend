import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from "axios";

const tourOptions = {
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav : false,
    responsive: {
        0:{
            items:1
        },
        768:{
            items:2
        },
        992:{
            items:3
        }
    }
};

function TourImg(props) {
    const [imgSourece, setImgSource] = useState();

    const reqUrl = '';

    useEffect(async () => {
        const response = await axios.get(reqUrl);
        setImgSource(response.data)
    }, [])

    const tourImgRender = () => {
        const result = [];
        for (let i = 0; i < 4; i++) {
            result.push(
                <div class="testimonial-item bg-light rounded p-4">
                    <img class="img-fluid" src="https://api.cdn.visitjeju.net/photomng/thumbnailpath/201804/30/e1c2f9e4-bf4c-488c-884c-5674f8d8b119.jpg" alt=""/>
                </div>
            );}
        return result;
    };

    return (
        <div class="container-xxl py-5">
            <div class="container">
                <h1 class="text-center mb-5">제주 관광지 사진</h1>
                <OwlCarousel class="owl-carousel testimonial-carousel" {...tourOptions}>
                    {tourImgRender()}
                </OwlCarousel>
            </div>
        </div>
    );
}

export default TourImg;