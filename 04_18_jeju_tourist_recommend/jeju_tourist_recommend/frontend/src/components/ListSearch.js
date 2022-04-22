import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";

function ListSearch(props) {
    const [searchInput, setSearchInput] = useState("")

    const bfSearch = decodeURI(window.location.search.split('=')[1]);

    const reqUrl = '/keyword/searchKeyword'

    const insertElastic = async () => {
        await axios
            .get(reqUrl, {
                params:{
                    search: searchInput
                }
            })
            .then();
    }

    // 검색 버튼 클릭 시 이동
    function btClick(e) {
        insertElastic()
        sessionStorage.setItem("pageSession", 1);
        window.location.href = "/jeju/TouristAttractionList?search=" + searchInput;
    }

    // 검색창에 ENTER 치는 경우에 검색 버튼 클릭으로 간주
    const onKeyPress = (e) => {
        if(e.key=='Enter'){
            btClick();
        }
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        // 이전 검색창에 입력된 값 유지
        setSearchInput(bfSearch)
    }, [])

    return (
        <div class="container-fluid-search bg-jeju mb-5 wow fadeIn" data-wow-delay="0.1s" >
            <div class="container">
                <div class="row g-2">
                    <div class="col-md-10">
                        <div class="row g-2">
                            <div class="col-md-12">
                                <input type="text" class="form-control border-0" placeholder="검색어를 입력하세요." onChange={(event) => setSearchInput(event.target.value)} onKeyPress={onKeyPress} value={searchInput}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-dark border-0 w-100" onClick={btClick}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListSearch;