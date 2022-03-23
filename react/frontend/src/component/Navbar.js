import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';

function Navbar(props) {

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                <a href="/" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                    <h1 className="m-0 main-text">제주 들렸섬?</h1>
                </a>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <a href="/" className="nav-item nav-link active">Home</a>
                        <a href="/#/TouristAttractionList" className="nav-item nav-link">List</a>
                        <a href="/#/TouristAttractionInfo" className="nav-item nav-link">Info</a>
                    </div>
                    <a href="" className="btn btn-primary bg-jeju-nav rounded-0 py-4 px-lg-5 d-none d-lg-block">Post A Job<i class="fa fa-arrow-right ms-3"></i></a>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navbar;