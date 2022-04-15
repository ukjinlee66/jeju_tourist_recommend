import React ,{useState, useEffect, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";
import Pagination from 'react-js-pagination';

function Tourlistitem(props) {
    // 현재 페이지 출력 관광지 리스트 
    const [tourList, setTourList] = useState([
        {id:'' ,img:'', source:'', sub_title:''}, 
        {id:'' ,img:'', source:'', sub_title:''}, 
        {id:'' ,img:'', source:'', sub_title:''}, 
        {id:'' ,img:'', source:'', sub_title:''},
        {id:'' ,img:'', source:'', sub_title:''}
        ])

    const [listSize, setListSize] = useState(1);
    const [page, setPage] = useState(1);

    // 특정 페이지 요청 시 작동하는 함수
    const handlePageChange = nowPage => {
        getListItem(nowPage);
        setPage(nowPage);
    };

    const reqUrl = '/source/searchByCertainColumn'
    const tourSizeUrl = '/source/searchSize'

    // 페이지에 따른 관광지 리스트 요청
    const getListItem = async (page) => {
        await axios
            .get(reqUrl, {
                params: {
                    search: decodeURI(window.location.search.split('=')[1]),
                    page: page
                }
            })
            .then((res) => setTourList(res.data));  
    }

    // 검색에 따른 관광지 리스트의 총 길이 요청
    const getlistSize = async () => {
        await axios
            .get(tourSizeUrl, {
                params: {
                    search: decodeURI(window.location.search.split('=')[1])
                }
            })
            .then((res) => setListSize(res.data));  
    }

   // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        console.log(window.sessionStorage.getItem('recoKeyword'))
        getlistSize();
        getListItem(page);
    }, [])

    // 관광지 리스트 렌더링
    const tourlistRender = () => {
        const result = [];
        for (let i = 0; i < tourList.length; i++) {
            result.push(
                // 출력 관광지 리스트의 관광지 id을 값으로 상세페이지에 보냄
                <div class="list-item p-4 mb-4"  onClick={(e) => window.location.href = "/jeju/TouristAttractionInfo?tourSpot=" + tourList[i].id}>
                    <div class="row g-4">
                        <div class="col-md-4 d-flex align-items-start">
                            <img class="img-list" src={tourList[i].img} />
                        </div>
                        <div class="col-md-8">
                            <h3 class="text-left" typeof='text' id='test' >{tourList[i].source}</h3>
                            <p class="list-p">{tourList[i].sub_title}</p>
                        </div>
                    </div>
                </div>
            );}
        return result;
    };

    return (
        <Fragment>
            {/* <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">관광지 리스트</h1> */}
            <div class="tab-class wow fadeInUp" data-wow-delay="0.3s">
                <div class="tab-content-tourlist">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        {tourlistRender()}
                    </div>
                </div>
            </div>
            <Pagination
                    activePage={page}
                    itemsCountPerPage={5}
                    totalItemsCount={listSize}
                    pageRangeDisplayed={5}
                    prevPageText="<"
                    nextPageText=">"
                    onChange={handlePageChange}
            />
        </Fragment>
    );
}

export default Tourlistitem;