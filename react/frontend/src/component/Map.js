import React, { useEffect } from 'react';
//import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import closebutton from './img/close-button.png'

export default function Map() 
{
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `         
        function initTmap() 
        {
          var map = new Tmapv2.Map("TMapApp", {
              center: new Tmapv2.LatLng(33.4000,126.51555),
              width: "100%",
              height: "60%",
              zoom:10
          });
          
          var marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(33.4000,126.51555),
            icon: imgURL,
            map: map
          })
          marker.addListener("click", function(evt)
          {
            infoWindow = new Tmapv2.InfoWindow({
              position: new Tmapv2.LatLng(33.4000,126.51555),
              content: content,
              border :'0px solid #FF0000',
              type: 2,
              map: map
            });
          });
          var content = "<div style='position: static; top: 320px; left : 320px; display: flex; font-size: 14px; box-shadow: 5px 5px 5px #00000040; border-radius: 10px; width : 400px; height:100px; background-color: rgba(0, 0, 0, 0.6); align-items: center; padding: 5px; color: #fff;'>"+
          "<div class='img-box' style='width: 110px; height: 90px; border-radius: 10px; background: #f5f5f5 url(resources/images/sample/p-sk-logo.png) no-repeat center;'></div>"+
          "<div class='info-box' style='margin-left: 10px;'>"+
          "<p style='margin-bottom: 7px;'>"+
          "<span class='tit' style=' font-size: 16px; font-weight: bold;'>티맵 모빌리티</span>"+
          "<a href='http://tmapapi.sktelecom.com/' target='_blank' class='link' style='color: #41A0FF; font-size: 13px; margin-left: 10px;'>홈페이지</a>"+
          "<p>"+
          "<span class='new-addr'>서울 중구 삼일대로 343 (우)04538</span>"+
          "</p>"+
          "<p>"+
          "<span class='old-addr'>(지번) 저동1가 114</span>"+
          "</p>"+
          "</div>"+
          "<a href='javascript:void(0)' onclick='onClose()' class='btn-close' style='position: absolute; top: 10px; right: 10px; display: block; width: 15px; height: 15px; background-image: url({closebutton}) no-repeat center;'></a>"+
          "</div>";
          

          // 2. 시작, 도착 심볼찍기
          // 시작
          addMarker("llStart",33.4560,126.51555,1);
          // 도착
          addMarker("llEnd",33.4000,126.55655,2);
          // 경유지
          addMarker("llPass",33.4001,126.55656,3);
          addMarker("llPass",33.4002,126.55657,4);
          addMarker("llPass",33.4003,126.55658,5);
          addMarker("llPass",33.4004,126.55659,6);
          //경유지를 위한 마커함수.
          function addMarker(status, lon, lat, tag) 
          {
            //출도착경유구분
            //이미지 파일 변경.
            var markerLayer;
            switch (status) {
              case "llStart":
                imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
                break;
              case "llPass":
                imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png';
                break;
              case "llEnd":
                imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
                break;
              default:
            };
            var marker = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(lat,lon),
              icon: imgURL,
              map: map
            });
            마커 드래그 설정
            marker.tag = tag;
            marker.addListener("dragend", function(evt)
            {
              markerListenerEvent(evt);
            });
            
            marker.addListener("drag", function(evt){    	
              markerObject = markerList[tag];
            });
            markerList[tag] = marker;
            return marker;
          }
        }
        
        
        //닫기 아이콘 클릭시 호출되는 함수.
        function onClose(popup){
          infoWindow.setVisible(false);
        }

        

        initTmap();`;
        script.type = "text/javascript";
        script.async = "async";
        document.head.appendChild(script);
  }, []);

  return (
    <div class="col-lg-7">
        <h1 class="text-center mb-5">&nbsp;<br/><br/><br/></h1>
        <div class="mb-5"/>
        <div id="TMapApp"/>
        <button>버튼</button>
    </div>
  );
}