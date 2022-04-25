import React, {Fragment, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import axios from "axios";

function Tourinfoitem(props) {

    // 상세 페이지 출력 관광지 정보 
    const [tourSpot, setTourSpot] = useState({tag_prev:'', content:'', detail_content:'', location:{type:'', coordinates:['','']}})
    const [nearTour, setNearTour] = useState({id:'', source:'', location:{type:'',coordinates:['','']}})

    const reqUrl = '/source/lookup';
    const reqUrl2 = '/map/findNear';

    const mapLoction = [];

    // 한 관광지에 대한 상세정보 요청
    const getInfoItem = async () => {
        await axios
            .get(reqUrl, {
                params: {
                    id: decodeURI(window.location.search.split('=')[1])
                }
            })
            .then((res) => getTourNear(res.data));
    }

    const getTourNear = async (tourInfo) =>{
        await axios
            .get(reqUrl2, {
                params: {
                    longtitude: tourInfo.location.coordinates[0],
                    latitude: tourInfo.location.coordinates[1],
                    distance: 2
                }
            })
            .then((res) => setNearTour(res.data),
                setTourSpot(tourInfo)
            );
    }

    // 처음 렌더링시 한번 실행되는 함수
    useEffect(() => {
        getInfoItem();
    }, [])

    // 상세페이지 관광지 정보 렌더링
    const tourSpotRender = () => {
        const result = [];
        result.push(
            <Fragment>
            <div class="mb-5">
                <p class="h4">상세정보</p>
                <p>{tourSpot.content}</p>
            </div>
            </Fragment>
        );
        for (let i = 0; i < nearTour.length; i++) {
            if (i == 5){
                break
            }
            mapLoction.push(nearTour[i].source)
            mapLoction.push(nearTour[i].location.coordinates)
        }
        sessionStorage.setItem("info_arr", mapLoction)

        if (mapLoction[0] != undefined){
            const script = document.createElement("script");
            script.innerHTML = `
                var map;
                let info_arr = ["관광지1",[126.51555, 33.5200],"관광지2",[126.50235, 33.5030],"관광지3",[126.49235, 33.5030],"관광지4",[126.48235, 33.5030]];
                info_arr = sessionStorage.getItem("info_arr");
                info_arr = info_arr.split(',');
                function initTmap() 
                {
                var lat;
                var lng;
                
                map = new Tmapv2.Map("TMapApp", {
                    center: new Tmapv2.LatLng(33.4000,126.51555),
                    width: "100%",
                    height: "60%",
                    zoom:10
                });
                let cnt = 1;
                for(let i = 0; i < info_arr.length;i+=3){
                    let str="";
                    let marker;
                    let title1 = info_arr[i];
                    let label="<span style='background-color: #46414E;color:white'>"+info_arr[i]+"</span>";
                    //Marker 객체 생성.
                    lat = info_arr[i+2];
                    lng = info_arr[i+1];
                    marker = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(Number(lat), Number(lng)), //Marker의 중심좌표 설정.
                        title: title1,
                        label: label
                    });
                    marker.setMap(map); //Marker가 표시될 Map 설정.
                    lat = info_arr[i+2];
                    lng = info_arr[i+1] + " " + lat;
                    str = '<button class="col-md-2 btnImages" style="width:30px; height:30px;" value="'+lng+'" type="button" onclick="center_map(this.value);return false;"><i class="bi bi-geo-alt"/></button>';
                    $("#btn"+String(cnt)).html(str);
                    cnt+=1;
                    }
                }
                //onclick function
                function center_map(name)
                {
                let temp = name.split(" ");
                let lonlat =  new Tmapv2.LatLng(Number(temp[1]),Number(temp[0]));
                map.setCenter(lonlat);
                map.setZoom(12);
                }
                initTmap();
            `;
            script.type = "text/javascript";
            script.async = "async";
            document.head.appendChild(script);
        }
        return result;
    };


    return (
        <Fragment>
            {tourSpotRender()}
        </Fragment>
    );
}

export default Tourinfoitem;