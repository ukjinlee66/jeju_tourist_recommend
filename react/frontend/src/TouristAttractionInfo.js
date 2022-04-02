import React, {Fragment, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import Scrolltop from './component/Scrolltop';
import Footer from './component/Footer';
import Tourinfoitem from './component/Tourinfoitem';
import NaverBlog from './component/NaverBlog';
import Map from './component/Map';
import TourinfoTop from './component/TourinfoTop';

function TouristAttractionInfo(props) {
    return (
        <Fragment>
            <Scrolltop />
            <TourinfoTop />
            <hr/>
            <div class="container-xxl py-5 wow fadeInUp pdCon" data-wow-delay="0.1s">
                <div class="row g-5 maCon" style={{width:'100%', height:'1100px'}}>
                    <div class="col-lg-5">
                        <Tourinfoitem/>
                        <hr/>
                        <NaverBlog/>
                    </div>
                    <Map/>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default TouristAttractionInfo;