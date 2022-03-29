import React, { useState, useEffect, Fragment } from 'react';
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
    const [imgSource, setImgSource] = useState([{img:'https://api.cdn.visitjeju.net/photomng/thumbnailpath/201804/30/e1c2f9e4-bf4c-488c-884c-5674f8d8b119.jpg'},{img:'https://api.cdn.visitjeju.net/photomng/thumbnailpath/201810/17/e798d53c-1c8a-4d44-a8ab-111beae96db4.gif'},{img:'https://api.cdn.visitjeju.net/photomng/thumbnailpath/201804/30/c9c42359-f82f-43a4-919e-03ecd197a2eb.jpg'},{img:'https://api.cdn.visitjeju.net/photomng/thumbnailpath/202110/20/b06b8d55-0f87-4efd-8a9f-a682a48a4868.JPG'}]);
    const reqUrl = '/tour/random';
    const tttt = 'https://api.cdn.visitjeju.net/photomng/thumbnailpath/201804/30/e1c2f9e4-bf4c-488c-884c-5674f8d8b119.jpg'
    
    // const getImg = async () => {
    //     await axios
    //         .get(reqUrl)
    //         .then((res) => setImgSource(res.data)); 
    // }; 

    // innerHTML 테스트 코드
    const getImg = async () => {
        await axios
            .get(reqUrl)
            .then(function (res) {
                console.log(res.data)
                // let imgCaro = ''
                // let imgCaro = '<OwlCarousel class="owl-carousel testimonial-carousel" {...tourOptions}>';
                // for(let i = 0; i < 4; i++){
                //     imgCaro = imgCaro + "<div class='testimonial-item bg-light rounded p-4'><img class='img-fluid' src=" + res.data[i].img + " /></div>";
                // }

                // imgCaro = imgCaro + '</OwlCarousel>';
                        
                // document.getElementById("imgTest").innerHTML = imgCaro;
                setImgSource(res.data)
            });
    }; 

    useEffect(() => {
        getImg()

    }, [])

    const tourImgRender = () => {
        const result = [];
        console.log(imgSource)
        for (let i = 0; i < 4; i++) {
            result.push(
                <Fragment>
                <div class="testimonial-item bg-light rounded p-4">
                    <img class="img-fluid" src={imgSource[i].img}/>
                </div>
                </Fragment>
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