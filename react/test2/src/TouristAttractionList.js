import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import Search from './component/Search';
import Scrolltop from './component/Scrolltop';
import Footer from './component/Footer';
import Tourlistitem from './component/Tourlistitem';

function TouristAttractionList(props) {
    return (
        <Fragment>
            <Search />
            <Scrolltop />
            <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container">
                    <div class="row g-5 ">
                        <Tourlistitem/>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default TouristAttractionList;