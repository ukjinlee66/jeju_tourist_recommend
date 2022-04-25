import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import Scrolltop from '../components/Scrolltop';
import Footer from '../components/Footer';
import Tourinfoitem from '../components/Tourinfoitem';
import NaverBlog from '../components/NaverBlog';
import MapInfo from '../components/MapInfo';
import TourinfoTop from '../components/TourinfoTop';
import ChatButton from '../components/ChatButton';
import Navbar from '../components/Navbar';

function TouristAttractionInfo(props) {
    return (
        <div class="container-xxl bg-white p-0">
            <Navbar/>
            <TourinfoTop />
            <div class="container-xxl py-5 wow fadeInUp pdCon" data-wow-delay="0.1s">
                <hr className='info-hr'/>
                <div class="row g-5 maCon" style={{width:'100%', minHeight:'1100px'}}>
                    <div class="col-lg-5">
                        <Tourinfoitem/>
                        <hr/>
                        <NaverBlog/>
                    </div>
                    <MapInfo/>
                </div>
            </div>
            <Scrolltop />
            <ChatButton/>
            <Footer />
        </div>
    );
}

export default TouristAttractionInfo;