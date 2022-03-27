import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function NaverBlog(props) {
    // 네이버 블로그 정보 
    const [naverBlog, setNaverBlog] = useState()

    const reqUrl = '';

    // 한글깨지는 현상 방지위해 decodeURI사용(관광지명)
    let getValue = decodeURI(window.location.search.split('=')[1]);

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(async () => {
        console.log(getValue);
        const params = {searchValue: {getValue}};
        const response = await axios.get(reqUrl, {params});
        setNaverBlog(response.data)
    }, [])

    const naverBlogRender = () => {
        const result = [];
        for (let i = 1; i < 3; i++) {
            result.push(
                <div className="mb-3">
                    <p className="h5">{'블로그'+i}</p>
                    <p>가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 </p>
                </div>
            );}
        return result;
    };


    return (
        <Fragment>
            <div className="d-flex align-items-center">
                <div className="text-left h3 mb-3">네이버블로그</div>
            </div>
            {naverBlogRender()}
        </Fragment>
    );
}

export default NaverBlog;