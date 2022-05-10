import React ,{useState, useEffect, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";
import Pagination from 'react-js-pagination';

function TourlistitemReco(props) {
    // 현재 페이지 출력 관광지 리스트 
    const [tourList, setTourList] = useState([
        {id:'' ,img:'', source:'', sub_title:'', location:{coordinates:['', '']}}, 
        {id:'' ,img:'', source:'', sub_title:'', location:{coordinates:['', '']}},
        {id:'' ,img:'', source:'', sub_title:'', location:{coordinates:['', '']}},
        {id:'' ,img:'', source:'', sub_title:'', location:{coordinates:['', '']}},
        {id:'' ,img:'', source:'', sub_title:'', location:{coordinates:['', '']}}
    ])

    const [page, setPage] = useState(1);

    const mapLoction = [];

    // 페이지에 따른 관광지 리스트 요청
    const handlePageChange = nowPage => {
        getListItemReco(nowPage);
        setPage(nowPage);
    };

    const reqUrl = '/recommend/relation'

    // 키워드 기준 추천된 관광지 리스트 요청
    const getListItemReco = async (userInput) => {
        await axios
            .get(reqUrl, {
                params: {
                    sentence: userInput,
                }
            })
            .then((res) => setTourList(res.data));  
    }

   // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getListItemReco(window.sessionStorage.getItem('recoKeyword'));
    }, [])

    // 관광지 리스트 렌더링
    const tourlistRender = () => {
        const result = [];
        console.log(tourList);
        for (let i = 0; i < tourList.length; i++) {
            mapLoction.push(tourList[i].source);
            mapLoction.push(tourList[i].location.coordinates);
            result.push(
                // 출력 관광지 리스트의 관광지 명을 값으로 상세페이지에 보냄
                <div class="list-item p-4 mb-4">
                    <div class="row g-4 list-section">
                        <div class="col-md-4 d-flex align-items-start">
                            <img class="img-list" src={tourList[i].img} onClick={(e) => window.location.href = "/jeju/TouristAttractionInfo?tourSpot=" + tourList[i].id} />
                        </div>
                        <div class="col-md-8 list-info">
                            <div className='row'>
                                <h4 class="col-md-10 text-left list-text" typeof='text' id='test' onClick={(e) => window.location.href = "/jeju/TouristAttractionInfo?tourSpot=" + tourList[i].id}>{tourList[i].source}</h4>
                                <p className='col-md-2' id={'btn' + (i+1)}></p>
                            </div>
                            <hr className='list-hr'/>
                            <p class="list-p">{tourList[i].sub_title}</p>
                        </div>
                    </div>
                </div>
            );}
        
        sessionStorage.setItem("attr_arr", mapLoction)
        if (mapLoction[0] != ''){
            const mapDiv = document.getElementById("TMapApp");
            if (mapDiv.childElementCount == null || mapDiv.childElementCount == 0){
                const script = document.createElement("script");
                script.innerHTML = `
                    var map;
                    let attr_list = ["관광지1",[126.51555, 33.5200],"관광지2",[126.50235, 33.5030],"관광지3",[126.49235, 33.5030],"관광지4",[126.48235, 33.5030]];
                    attr_list = sessionStorage.getItem("attr_arr");
                    attr_list = attr_list.split(',');
                    function initTmap() 
                    {
                    var lat;
                    var lng;
                    console.log("initmap");
                    console.log(attr_list);
                    map = new Tmapv2.Map("TMapApp", {
                        center: new Tmapv2.LatLng(33.4000,126.51555),
                        width: "100%",
                        height: "60%",
                        zoom:10
                    });
                    let cnt = 1;
                    for(let i = 0; i < attr_list.length;i+=3){
                        let str="";
                        let marker;
                        let title1 = attr_list[i];
                        let label="<span style='background-color: #46414E;color:white'>"+attr_list[i]+"</span>";
                        //Marker 객체 생성.
                        lat = attr_list[i+2];
                        lng = attr_list[i+1];
                        console.log(lat, lng);
                        marker = new Tmapv2.Marker({
                            position: new Tmapv2.LatLng(Number(lat), Number(lng)), //Marker의 중심좌표 설정.
                            title: title1,
                            label: label
                        });
                        marker.setMap(map); //Marker가 표시될 Map 설정.
                        lat = attr_list[i+2];
                        lng = attr_list[i+1] + " " + lat;
                        str = '<button class="col-md-2 btnImages" style="width:30px; height:30px;" value="'+lng+'" type="button" onclick="center_map(this.value);return false;"><i class="bi bi-geo-alt"/></button>';
                        $("#btn"+String(cnt)).html(str);
                        cnt+=1;
                        }
                    }
                    //onclick function
                    function center_map(name)
                    {
                    console.log(name);
                    let temp = name.split(" ");
                    console.log(temp);
                    console.log(Number(temp[1]),Number(temp[0]));
                    let lonlat =  new Tmapv2.LatLng(Number(temp[1]),Number(temp[0]));
                    map.setCenter(lonlat);
                    map.setZoom(12);
                    }
                    initTmap();
                `;
                script.type = "text/javascript";
                script.async = "async";
                script.id = "testid";
                script.className = "testid";
                document.head.appendChild(script);
            }
            else{
                mapDiv.removeChild(mapDiv.firstChild);
                const script = document.createElement("script");
                script.innerHTML = `
                    var map;
                    attr_list = ["관광지1",[126.51555, 33.5200],"관광지2",[126.50235, 33.5030],"관광지3",[126.49235, 33.5030],"관광지4",[126.48235, 33.5030]];
                    attr_list = sessionStorage.getItem("attr_arr");
                    attr_list = attr_list.split(',');
                    function initTmap() 
                    {
                    var lat;
                    var lng;
                    console.log("initmap");
                    console.log(attr_list);
                    map = new Tmapv2.Map("TMapApp", {
                        center: new Tmapv2.LatLng(33.4000,126.51555),
                        width: "100%",
                        height: "60%",
                        zoom:10
                    });
                    let cnt = 1;
                    for(let i = 0; i < attr_list.length;i+=3){
                        let str="";
                        let marker;
                        let title1 = attr_list[i];
                        let label="<span style='background-color: #46414E;color:white'>"+attr_list[i]+"</span>";
                        //Marker 객체 생성.
                        lat = attr_list[i+2];
                        lng = attr_list[i+1];
                        console.log(lat, lng);
                        marker = new Tmapv2.Marker({
                            position: new Tmapv2.LatLng(Number(lat), Number(lng)), //Marker의 중심좌표 설정.
                            title: title1,
                            label: label
                        });
                        marker.setMap(map); //Marker가 표시될 Map 설정.
                        lat = attr_list[i+2];
                        lng = attr_list[i+1] + " " + lat;
                        str = '<button class="col-md-2 btnImages" style="width:30px; height:30px;" value="'+lng+'" type="button" onclick="center_map(this.value);return false;"><i class="bi bi-geo-alt"/></button>';
                        $("#btn"+String(cnt)).html(str);
                        cnt+=1;
                        }
                    }
                    //onclick function
                    function center_map(name)
                    {
                    console.log(name);
                    let temp = name.split(" ");
                    console.log(temp);
                    console.log(Number(temp[1]),Number(temp[0]));
                    let lonlat =  new Tmapv2.LatLng(Number(temp[1]),Number(temp[0]));
                    map.setCenter(lonlat);
                    map.setZoom(12);
                    }
                    initTmap();
                `;
                script.type = "text/javascript";
                script.async = "async";
                script.id = "testid";
                script.className = "testid";
                document.head.appendChild(script);
            }
        }
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
                    totalItemsCount={5}
                    pageRangeDisplayed={5}
                    prevPageText="<"
                    nextPageText=">"
                    onChange={handlePageChange}
            />
        </Fragment>
    );
}

export default TourlistitemReco;