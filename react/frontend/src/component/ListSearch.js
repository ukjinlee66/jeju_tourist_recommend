import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';

function ListSearch(props) {
    const [searchInput, setSearchInput] = useState("")

    const bfSearch = decodeURI(window.location.search.split('=')[1]);

    function btClick(e) {
        window.location.href = "/jeju/TouristAttractionList?search=" + searchInput;
    }

    const onKeyPress = (e) => {
        if(e.key=='Enter'){
            btClick();
        }
    }

    useEffect(() => {
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