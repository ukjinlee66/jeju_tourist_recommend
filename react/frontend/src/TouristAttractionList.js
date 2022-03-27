import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import MainSearch from './component/MainSearch';
import Scrolltop from './component/Scrolltop';
import Footer from './component/Footer';
import Tourlistitem from './component/Tourlistitem';
import Map from './component/Map';

function TouristAttractionList(props) {
    return (
        <Fragment>
            <MainSearch />
            <Scrolltop />
            <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container">
                    <div class="row g-4 ">
                        <Tourlistitem/>
                        <Map/>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default TouristAttractionList;