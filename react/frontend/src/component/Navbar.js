import React, { Fragment, useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import styled from 'styled-components';
import logo from './img/logo.png';

function Navbar(props) {
    const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장 

    // useRef를 통해 css 변경
    const stickyChange = useRef(null);
    
    function handleScroll() { 
        setScrollY(window.pageYOffset);
        if(ScrollY > 300) {
            stickyChange.current.style.top = '0px';
        } else {
            stickyChange.current.style.top = '-100px';
        }
    }

    useEffect(() => {
        function scrollListener() {  window.addEventListener("scroll", handleScroll); } //  window 에서 스크롤을 감시 시작
        scrollListener(); // window 에서 스크롤을 감시
        return () => { window.removeEventListener("scroll", handleScroll); }; //  window 에서 스크롤을 감시를 종료
    });

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0" ref={stickyChange}>
                <a href="/jeju" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                    <img class="logo" src={logo}/>
                </a>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <a href="/jeju" className="nav-item nav-link active">Home</a>
                        <a href="/jeju/TouristAttractionList?search=" className="nav-item nav-link">List</a>
                        <a href="/jeju/TouristAttractionInfo" className="nav-item nav-link">Info</a>
                    </div>
                    <a href="" className="btn btn-primary bg-jeju-nav rounded-0 py-4 px-lg-5 d-none d-lg-block">Post A Job<i class="fa fa-arrow-right ms-3"></i></a>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navbar;