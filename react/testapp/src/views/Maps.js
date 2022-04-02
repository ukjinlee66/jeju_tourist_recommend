/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import React from "react";

// // reactstrap components
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

// // core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
// import 'bootstrap/dist/css/bootstrap.css';
// import './css/bootstrap.min.css';
// import './css/style.css';

const MapWrapper = () => 
{
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
        var map;
        var markerInfo;
        //출발지,도착지 마커
        var marker_s, marker_e, marker_p;
        //경로그림정보
        var drawInfoArr = [];
        var drawInfoArr2 = [];
      
        var chktraffic = [];
        var resultdrawArr = [];
        var resultMarkerArr = [];         
        function initTmap() 
        {
            map = new Tmapv2.Map("TMapApp", {
                center: new Tmapv2.LatLng(33.4000,126.51555),
                width: "100%",
                height: "100%",
                zoom:12,
                zoomControl : true,
					      scrollwheel : true
            });
            
            addMarkerAni(Tmapv2.MarkerOptions.ANIMATE_FADEIN);
        }
        
        var markers = [];
        
        // 마커들의 좌표를 저장할 배열입니다.
        var coords = [new Tmapv2.LatLng(33.4000,126.51555),
          new Tmapv2.LatLng(33.4000,126.51755),
          new Tmapv2.LatLng(33.4000,126.51955),
          new Tmapv2.LatLng(33.4000,126.52255),
          new Tmapv2.LatLng(33.4000,126.52555),
        ];

        // 마커를 추가하는 함수입니다.
        function addMarkerAni(aniType) {
          var coordIdx = 0;
                
          removeMarkers(); // 지도에 새로 등록하기 위해 모든 마커를 지우는 함수입니다.
                
          var func = function() {
            //Marker 객체 생성.
            var marker = new Tmapv2.Marker({
              position: coords[coordIdx++], //Marker의 중심좌표 설정.
              draggable: true, //Marker의 드래그 가능 여부.
              animation: aniType, //Marker 애니메이션.
              animationLength: 500, //애니메이션 길이.
              label: '관광지'+(coordIdx-1), //Marker의 라벨.
              title: '관광지 정보1<br>관광지 정보2<br>관광지 정보3<br>관광지 정보4<br>', //Marker 타이틀.
              map: map //Marker가 표시될 Map 설정.
            });
                  
            markers.push(marker);

            if (coordIdx < 5) {
              // 일정 시간 간격으로 마커를 생성하는 함수를 실행합니다
              setTimeout(func, 300);
            }
          }
          // 일정 시간 간격으로 마커를 생성하는 함수를 실행합니다
          setTimeout(func, 300);
        }
        // 모든 마커를 제거하는 함수입니다.
        function removeMarkers() {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }
        //지도 타입 변경.
        function MapType(type){
          if("SATELLITE" == type){
              map.setMapType(Tmapv2.Map.MapType.SATELLITE);
          }else if("HYBRID" == type){
              map.setMapType(Tmapv2.Map.MapType.HYBRID)
          }else if("ROAD" == type){
              map.setMapType(Tmapv2.Map.MapType.ROAD)
          }
        }
        initTmap();
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);
  return (
    <div id="TMapApp"/>
  );
}
function FullScreenMap() 
{
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
            <Card>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                <button onClick={()=>MapType('ROAD')}>ROAD</button>
                <button onClick={()=>MapType('SATELLITE')}>SATELLITE</button>
                <button onClick={()=>MapType('HYBRID')}>HYBRID</button>
                <MapWrapper/>
                </div>
              </CardBody>
            </Card>
      </div>
    </>
  );
}

export default FullScreenMap;