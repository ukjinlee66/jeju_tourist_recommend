import React, {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import MainSearch from './component/MainSearch';
import KeywordList from './component/KeywordList';
import MainImg from './component/MainImg';
import TourImg from './component/TourImg';
import Ranking from './component/Ranking';
import Scrolltop from './component/Scrolltop';
import Footer from './component/Footer';
import SnsRanking from './component/SnsRanking';

function Main(props) {
    return (
        <Fragment>
            <MainImg />
            <MainSearch />
            <KeywordList />
            <div class="container-xxl py-3">
                <div class="row g-4">
                    <Ranking />
                    <SnsRanking/>
                </div>
            </div>
            <TourImg />
            <Scrolltop />
            <Footer />
        </Fragment>
    );
}

export default Main;