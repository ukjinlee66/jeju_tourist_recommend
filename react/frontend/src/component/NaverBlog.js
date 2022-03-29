import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import axios from "axios";

function NaverBlog(props) {
    // 네이버 블로그 정보 
    const [naverBlog, setNaverBlog] = useState()

    const sample = [{tour:'#성산일출봉_UNESCO 세계자연유산_제주 동쪽', description:'UNESCO 세계자연유산에 등재된, 제주 홍보 이미지에서 자주 보게 되는 성산일출봉! 다른 오름들과 달리... 제주 동쪽의 아름다운 성산일출봉을 담아본다. 성산일출봉 제주 서귀포시 성산읍 성산리 1 섭지코지에서... '}, {tour:'놀멍쉬멍 “성산일출봉(UNESCO 세계자연유산)” 탐방', description:'초입부터 유네스코 &quot;세계자연유산 성산일출봉&quot; 임을 한번더 알려줍니다. 성산일출봉은 코스는 두가지로 관람을 할 수 있는데요... 길 왼편은 무료 코스 오른편은 정상까지 오를 수 있는 유료 코스 에요. 아이들... '}]

    const reqUrl = '';

    const getNaverBlog = async () => {
            await axios
                .get(reqUrl, {
                    params:{id:decodeURI(window.location.search.split('=')[1])
                    }
                })
                .then((res) => setNaverBlog(res.data));
    }

    // 처음 렌더링시 한번 실행되는 함수
    // useEffect(() => {
    //     getNaverBlog();
    // }, [])

    const naverBlogRender = () => {
        const result = [];
        for (let i = 0; i < sample.length; i++) {
            result.push(
                <div className="mb-3">
                    <p className="h5">{sample[i].tour}</p>
                    <p>{sample[i].description}</p>
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