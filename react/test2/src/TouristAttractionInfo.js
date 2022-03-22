import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import Search from './component/Search';
import MainImg from './component/MainImg';
import Scrolltop from './component/Scrolltop';
import Footer from './component/Footer';
import Tourinfoitem from './component/Tourinfoitem';

function TouristAttractionInfo(props) {
    return (
        <Fragment>
            <Scrolltop />
            <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container">
                    <div class="row g-5 ">
                        <Tourinfoitem/>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default TouristAttractionInfo;