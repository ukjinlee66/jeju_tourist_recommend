import React, {Fragment, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";
import Map from './Map';
function Tourinfoitem(props) {

    // 상세 페이지 출력 관광지 정보 
    const [tourSpot, setTourSpot] = useState({tag_prev:'', content:'', detail_content:'', location:{type:'', coordinates:['','']}})
    const [Neartour, setNearTour] = useState({id:'', source:'', location:{type:'',coordinates:['','']}})
    const reqUrl = '/source/lookup';
    const reqUrl2 = '/map/findNear';
    
    // let lat;
    // let lng;
    // let dist;
    
    // 한 관광지에 대한 상세정보 요청
    const getInfoItem = async () => {
        await axios
            .get(reqUrl, {
                params: {
                    id: decodeURI(window.location.search.split('=')[1])
                }
            })
            .then((res) => setTourSpot(res.data));
    }
    const getTourNear = async () =>{
        await axios
            .get(reqUrl2, {
                params: {
                    longtitude: parseFloat(tourSpot.location.coordinates[0]),
                    latitude: parseFloat(tourSpot.location.coordinates[1]),
                    distance: 2
                }
            })
            .then((res) => setNearTour(res.data));
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getInfoItem();
    }, [])

    // 상세페이지 관광지 정보 렌더링
    const tourSpotRender = () => {
        const result = [];
        const mapLoction = [];
        if (tourSpot.location.coordinates[0]!='')
        {
            getTourNear();
            for(let i = 0; i < Neartour.length;i++)
            {
                mapLoction.push(Neartour[i].source);
                mapLoction.push(Neartour[i].location.coordinates)
            }
            sessionStorage.setItem("attr_arr", mapLoction);
        }
        const script3 = document.createElement("infomap");
            script3.innerHTML = `
                var map;
                let attr_list = ["관광지1",[33.5200,126.51555],"관광지2",[33.5030,126.50235],"관광지3",[33.5030,126.49235],"관광지4",[33.5030,126.48235]];
                attr_list = sessionStorage.getItem("attr_arr");
                attr_list = attr_list.split(',');
                function InitTmap() 
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
                        }
                }
                initTmap();`;
            script3.type = "text/javascript";
            script3.async = "async";
            document.head.appendChild(script3);
        result.push(
            <Fragment>
            <div class="mb-5">
                <p class="h4">상세정보</p>
                <p>{tourSpot.content}</p>
            </div>
            </Fragment>
        );
        return result;
    };


    return (
        <Fragment>
            {tourSpotRender()}
        </Fragment>
    );
}

export default Tourinfoitem;