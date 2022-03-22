import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import Search from './component/Search';
import KeywordList from './component/KeywordList';
import MainImg from './component/MainImg';
import TourImg from './component/TourImg';
import Ranking from './component/Ranking';
import Scrolltop from './component/Scrolltop';
import Footer from './component/Footer';

function Main(props) {
    return (
        <Fragment>
            <MainImg />
            <Search />
            <KeywordList />
            <Ranking />
            <TourImg />
            <Scrolltop />
            <Footer />
        </Fragment>
    );
}

export default Main;