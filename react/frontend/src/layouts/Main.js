import React, {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import MainSearch from '../components/MainSearch';
import KeywordList from '../components/KeywordList';
import MainImg from '../components/MainImg';
import TourImg from '../components/TourImg';
import Ranking from '../components/Ranking';
import Scrolltop from '../components/Scrolltop';
import Footer from '../components/Footer';
import SnsRanking from '../components/SnsRanking';
import ChatButton from '../components/ChatButton';

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
            <ChatButton/>
            <Footer />
        </Fragment>
    );
}

export default Main;