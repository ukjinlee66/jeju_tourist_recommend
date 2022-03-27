import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';

function Scrolltop(props) {
    return (
        <Fragment>
             <a href="#" className="btn btn-lg btn-primary bg-jeju-nav btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
        </Fragment>
    );
}

export default Scrolltop;