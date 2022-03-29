import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import Scrolltop from './component/Scrolltop';
import Footer from './component/Footer';
import Tourinfoitem from './component/Tourinfoitem';
import NaverBlog from './component/NaverBlog';
import Map from './component/Map';

function TouristAttractionInfo(props) {
    return (
        <Fragment>
            <Scrolltop />
            <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container">
                    <div class="row g-5 ">
                        <div class="col-lg-5">
                            <Tourinfoitem/>
                            <NaverBlog/>
                        </div>
                        <Map/>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default TouristAttractionInfo;