import React, {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import MainSearch from '../components/MainSearch';
import Scrolltop from '../components/Scrolltop';
import Footer from '../components/Footer';
import TourlistitemReco from '../components/TourlistitemReco';
import Map from '../components/Map';
import ChatButton from '../components/ChatButton';

function TouristAttractionListReco(props) {
    return (
        <Fragment>
            <MainSearch />
            <div class="container-xxl py-5 wow fadeInUp pdCon" data-wow-delay="0.1s">
                <div class="row g-5 maCon" style={{width:'100%'}}>
                    <div class="col-lg-5">
                        <TourlistitemReco/>
                    </div>
                    <Map/>
                </div>
            </div>
            <Scrolltop />
            <ChatButton/>
            <Footer />
        </Fragment>
    );
}

export default TouristAttractionListReco;