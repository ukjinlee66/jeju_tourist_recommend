import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import ListSearch from '../components/ListSearch';
import Scrolltop from '../components/Scrolltop';
import Footer from '../components/Footer';
import Tourlistitem from '../components/Tourlistitem';
import Map from '../components/Map';
import ChatButton from '../components/ChatButton';
import Navbar from '../components/Navbar';

function TouristAttractionList(props) {
    return (
        <div class="container-xxl bg-white p-0">
            <Navbar/>
            <ListSearch />
            <div class="container-xxl py-5 wow fadeInUp pdCon" data-wow-delay="0.1s">
                <div class="row g-5 maCon" style={{width:'100%'}}>
                    <div class="col-lg-5">
                        <Tourlistitem/>
                    </div>
                    <Map/>
                </div>
            </div>
            <Scrolltop />
            <ChatButton/>
            <Footer />
        </div>
    );
}

export default TouristAttractionList;