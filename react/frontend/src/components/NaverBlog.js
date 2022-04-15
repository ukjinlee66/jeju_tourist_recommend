import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import naverlogo from '../assets/img/naver.ico'
import axios from "axios";

function NaverBlog(props) {
    // 네이버 블로그 정보 
    const [naverBlog, setNaverBlog] = useState([{title:'', contents:{title:'', link:'', description:''}}, {title:'', contents:{title:'', link:'', description:''}}])

    const reqUrl = '/Blog/recentTwo';
    const tourUrl = '/source/lookup';

    // 해당 상세페이지의 관광지명 요청
    const getTourName = async (tourNames) => {
        await axios
            .get(tourUrl, {
                params: {
                    id: tourNames
                }
            })
            .then((res) => getNaverBlog(res.data.source));
    }

    // 관광지명을 통해서 네이버 블로그 정보 요청
    const getNaverBlog = async (tourName) => {
            await axios
                .get(reqUrl, {
                    params:{
                        source:tourName
                    }
                })
                .then((res) => setNaverBlog(res.data));
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getTourName(decodeURI(window.location.search.split('=')[1]))
    }, [])

    // 네이버 블로그 정보 렌더링
    const naverBlogRender = () => {
        const result = [];
        for (let i = 0; i < 2; i++) {
            result.push(
                <div className="mb-3">
                    <p className="h5 navarblog-btn" onClick={(e) => window.location.href = naverBlog[i].contents.link}>{naverBlog[i].contents.title}</p>
                    <p>{naverBlog[i].contents.description}</p>
                </div>
            );}
        return result;
    };

    return (
        <Fragment>
            <div className='naver-div'>
                <img className='naverImg' src={naverlogo}/>Blog
            </div>
            <br/>
            {naverBlogRender()}
        </Fragment>
    );
}

export default NaverBlog;