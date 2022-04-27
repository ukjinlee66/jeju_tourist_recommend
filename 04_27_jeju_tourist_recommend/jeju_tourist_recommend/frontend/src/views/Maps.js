import { Card, CardBody } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState} from 'react';


const MapWrapper = () => 
{
	const [nearTour, setNearTour] = useState({id:'', source:'', location:{type:'',coordinates:['','']}})
	const reqUrl2 = '/map/findNear';
	const mapLoction = [];
	
	const getTourNear = async () =>{
		var temp = new URLSearchParams(window.location.search);;
		await axios.get(reqUrl2, {
				params: {
					longitude: temp.get('longitude'),
					latitude: temp.get('latitude'),
					distance: 2
				}
			}).then((res) => setNearTour(res.data));
	}

	useEffect(() => {
		getTourNear();
	},[])

	useEffect(() => 
	{
		for(let i = 0; i < nearTour.length;i++)
		{
			mapLoction.push(nearTour[i].source);
			mapLoction.push(nearTour[i].location.coordinates)
		}

		sessionStorage.setItem("maps_arr", mapLoction);
		if (mapLoction[0] != undefined){
			const script = document.createElement("script");
			script.innerHTML = `
				var map;
				var markerInfo;
				//출발지,도착지 마커
				var marker_s, marker_e, marker_p, new_marker_p2;
				//경로그림정보
				var drawInfoArr = [];
				var drawInfoArr2 = [];
				var marker_attr = [];
				var chktraffic = [];
				var resultdrawArr = [];
				var resultMarkerArr = [];

				//관광지는 n x [2] 열은 위도,경도
				var attr_list = ["관광지1", 33.5200,126.51555,"관광지2",33.5030,126.50235,"관광지3",33.5030,126.49235,"관광지4",33.5030,126.48235];
				attr_list = sessionStorage.getItem("maps_arr");
				attr_list = attr_list.split(',');
				const markers = new Map();
				function initTmap() {
					// 1. 지도 띄우기
					map = new Tmapv2.Map("map_div", {
						center : new Tmapv2.LatLng(33.4000,126.51555),
						width : "100%",
						height : "800px",
						zoom : 11,
						zoomControl : true,
						scrollwheel : true
					});
					addMarkersTooMuch(attr_list);
					

					let temp_html = "";
					temp_html = '<button value="ROAD" onclick="MapType(this.value)">ROAD</button>\
					<button value="SATELLITE" onclick="MapType(this.value)">SATELLITE</button>\
					<button value="HYBRID" onclick="MapType(this.value)">HYBRID</button>';
					$("#mapty").html(temp_html);

					let cent_button="";
					cent_button='<button>'+this+'</button>';
					$("#res3").html(cent_button);
					
					temp_html = '<form><input class="map-resetbtn" type="button" value="초기화" onclick="window.location.reload()"></form>';
					$("#init_map").html(temp_html);
				}
				//end initmap
				function addMarkersTooMuch(attr_list) 
				{
					for (var i = 0; i < attr_list.length; i+=3) 
					{
						let title1 = attr_list[i];
						let lat = attr_list[i+2];
						let lng = attr_list[i+1];
						let label="<span style='background-color: #46414E;color:white'>"+attr_list[i]+"</span>";
						let marker;
						//Marker 객체 생성.
						marker = new Tmapv2.Marker({
							position: new Tmapv2.LatLng(lat, lng), //Marker의 중심좌표 설정.
							title: title1,
							label: label
						});
						marker_attr.push(marker);
						marker.setMap(map); //Marker가 표시될 Map 설정.
						marker.addListener("click", function(evt) 
						{
							markers.set(title1, marker);
							retres();
						});
					}
				}
				function removeMarkers() {
					markers.clear();
				}

				function Sendinfo() 
				{
						//기존 맵에 있던 정보들 초기화
						resettingMap();
						//sendinfo variable
						let startx="";
						let starty="";
						let endx="";
						let endy="";
						let pass="";
						const iter1 = markers.entries();
						let temp_mark;
						for(var i=0;i<markers.size;i++)
						{
							//start point
							temp_mark = iter1.next().value;
							temp_mark = temp_mark[1].getPosition();
							if(i==0)
							{
								starty = String(temp_mark.latitude());
								startx = String(temp_mark.longitude());
							}
							else if(i == Number(markers.size)-1) // end point
							{
								endy = String(temp_mark.latitude());
								endx = String(temp_mark.longitude());
							}
							else // pass point
							{
								if(i == Number(markers.size)-2)
								{
									pass+=String(temp_mark.longitude()) + "," + String(temp_mark.latitude());
								}else{
									pass+=String(temp_mark.longitude()) + "," + String(temp_mark.latitude()+ "_");
								}
							}
						}
						//JSON TYPE EDIT [S]
						$.ajax({
							type : "POST",
							url : "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
							async : false,
							data : {
								"appKey" : "l7xx34194c87b04c4474abec384877be1ee4",
								"startX" : startx,
								"startY" : starty,
								"endX" : endx,
								"endY" : endy,
								"passList" : pass,
								"reqCoordType" : "WGS84GEO",
								"resCoordType" : "EPSG3857",
								"searchOption" : "0",
								"trafficInfo" : "Y"
							},
							success : function(response) 
							{
								var resultData = response.features;
		
								var tDistance = "총 거리 : "
									+ (resultData[0].properties.totalDistance / 1000)
										.toFixed(1) + "km,";
								var tTime = " 총 시간 : "
									+ (resultData[0].properties.totalTime / 60)
										.toFixed(0) + "분,";
								var tFare = " 총 요금 : "
									+ resultData[0].properties.totalFare
									+ "원,";
								var taxiFare = " 예상 택시 요금 : "
									+ resultData[0].properties.taxiFare
									+ "원";
		
								$("#result").text(
										tDistance + tTime + tFare
												+ taxiFare);
		
								//교통정보 표출 옵션값을 체크
								for ( var i in resultData) { //for문 [S]
									var geometry = resultData[i].geometry;
									var properties = resultData[i].properties;
		
									if (geometry.type == "LineString") 
									{
									//교통 정보도 담음
									chktraffic.push(geometry.traffic);
									var sectionInfos = [];
									var trafficArr = geometry.traffic;
		
									for ( var j in geometry.coordinates) 
									{
										// 경로들의 결과값들을 포인트 객체로 변환 
										var latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
										// 포인트 객체를 받아 좌표값으로 변환
										var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
		
										sectionInfos.push(convertPoint);
									}
		
									drawLine(sectionInfos,trafficArr);
									} 
									else 
									{
		
									var markerImg = "";
									var pType = "";
		
									if (properties.pointType == "S") { //출발지 마커
										markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
										pType = "S";
									} else if (properties.pointType == "E") { //도착지 마커
										markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
										pType = "E";
									} else { //각 포인트 마커
										markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
										pType = "P";
									}
		
									// 경로들의 결과값들을 포인트 객체로 변환 
									var latlon = new Tmapv2.Point(
										geometry.coordinates[0],
										geometry.coordinates[1]);
									// 포인트 객체를 받아 좌표값으로 다시 변환
									var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);
		
									var routeInfoObj = 
									{
										markerImage : markerImg,
										lng : convertPoint._lng,
										lat : convertPoint._lat,
										pointType : pType
									};
									// 마커 추가
									addMarkers(routeInfoObj);
									}
								}//for문 [E]
							}
							});
						//JSON TYPE EDIT [E]
					initTmap();
			}

			function addComma(num) {
						var regexp = /\B(?=(\d{3})+(?!\d))/g;
						return num.toString().replace(regexp, ',');
					}
				
					//마커 생성하기
					function addMarkers(infoObj) 
					{
						var size = new Tmapv2.Size(24, 38);//아이콘 크기 설정합니다.
				
						if (infoObj.pointType == "P") { //포인트점일때는 아이콘 크기를 줄입니다.
							size = new Tmapv2.Size(8, 8);
						}
				
						marker_p = new Tmapv2.Marker({
							position : new Tmapv2.LatLng(infoObj.lat, infoObj.lng),
							icon : infoObj.markerImage,
							iconSize : size,
							map : map
						});
				
						resultMarkerArr.push(marker_p);
					}
				
					//라인그리기
					function drawLine(arrPoint, traffic) 
					{
						var polyline_;
				
						if (chktraffic.length != 0) {
				
							// 교통정보 혼잡도를 체크
							// strokeColor는 교통 정보상황에 다라서 변화
							// traffic :  0-정보없음, 1-원활, 2-서행, 3-지체, 4-정체  (black, green, yellow, orange, red)
				
							var lineColor = "";
							if (traffic != "0" && traffic != undefined) 
							{
								if (traffic.length == 0) //length가 0인것은 교통정보가 없으므로 검은색으로 표시
								{ 
				
									lineColor = "#06050D";
									//라인그리기[S]
									polyline_ = new Tmapv2.Polyline({
										path : arrPoint,
										strokeColor : lineColor,
										strokeWeight : 6,
										map : map
									});
									resultdrawArr.push(polyline_);
									//라인그리기[E]
								} else 
								{ //교통정보가 있음
				
									if (traffic[0][0] != 0) { //교통정보 시작인덱스가 0이 아닌경우
										var trafficObject = "";
										var tInfo = [];
				
										for (var z = 0; z < traffic.length; z++) {
											trafficObject = {
												"startIndex" : traffic[z][0],
												"endIndex" : traffic[z][1],
												"trafficIndex" : traffic[z][2],
											};
											tInfo.push(trafficObject)
										}
				
										var noInfomationPoint = [];
				
										for (var p = 0; p < tInfo[0].startIndex; p++) {
											noInfomationPoint.push(arrPoint[p]);
										}
				
										//라인그리기[S]
										polyline_ = new Tmapv2.Polyline({
											path : noInfomationPoint,
											strokeColor : "#06050D",
											strokeWeight : 6,
											map : map
										});
										//라인그리기[E]
										resultdrawArr.push(polyline_);
				
										for (var x = 0; x < tInfo.length; x++) {
											var sectionPoint = []; //구간선언
				
											for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
												sectionPoint.push(arrPoint[y]);
											}
				
											if (tInfo[x].trafficIndex == 0) {
												lineColor = "#06050D";
											} else if (tInfo[x].trafficIndex == 1) {
												lineColor = "#61AB25";
											} else if (tInfo[x].trafficIndex == 2) {
												lineColor = "#FFFF00";
											} else if (tInfo[x].trafficIndex == 3) {
												lineColor = "#E87506";
											} else if (tInfo[x].trafficIndex == 4) {
												lineColor = "#D61125";
											}
				
											//라인그리기[S]
											polyline_ = new Tmapv2.Polyline({
												path : sectionPoint,
												strokeColor : lineColor,
												strokeWeight : 6,
												map : map
											});
											//라인그리기[E]
											resultdrawArr.push(polyline_);
										}
									} else { //0부터 시작하는 경우
				
										var trafficObject = "";
										var tInfo = [];
				
										for (var z = 0; z < traffic.length; z++) {
											trafficObject = {
												"startIndex" : traffic[z][0],
												"endIndex" : traffic[z][1],
												"trafficIndex" : traffic[z][2],
											};
											tInfo.push(trafficObject)
										}
				
										for (var x = 0; x < tInfo.length; x++) {
											var sectionPoint = []; //구간선언
				
											for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
												sectionPoint.push(arrPoint[y]);
											}
				
											if (tInfo[x].trafficIndex == 0) {
												lineColor = "#06050D";
											} else if (tInfo[x].trafficIndex == 1) {
												lineColor = "#61AB25";
											} else if (tInfo[x].trafficIndex == 2) {
												lineColor = "#FFFF00";
											} else if (tInfo[x].trafficIndex == 3) {
												lineColor = "#E87506";
											} else if (tInfo[x].trafficIndex == 4) {
												lineColor = "#D61125";
											}
				
											//라인그리기[S]
											polyline_ = new Tmapv2.Polyline({
												path : sectionPoint,
												strokeColor : lineColor,
												strokeWeight : 6,
												map : map
											});
											//라인그리기[E]
											resultdrawArr.push(polyline_);
										}
									}
								}
							}
						} 
						else 
						{
							polyline_ = new Tmapv2.Polyline({
								path : arrPoint,
								strokeColor : "#DD0000",
								strokeWeight : 6,
								map : map
							});
							resultdrawArr.push(polyline_);
						}
				
					}
					//초기화 기능
					function resettingMap() 
					{
						for (var i = 0; i < marker_attr.length; i++) 
						{
							if(i==0 || i == marker_attr.legnth-1)
							{
								marker_attr[i].setMap(null);
							}
						}
						marker_attr=[];
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
			let cnt=0;
			function retres()
			{
				let str="";
				for(const item of markers)
				{
					str+='<div class="row btn-row g-3 mapbtn-section"><h3 class="col-lg-9 map-source">'+item[0]+'</h3>\
					<button class="col-lg-3 del-btn" type="button" value="'+item[0]+'" onclick="deletemark(this.value);return false;">삭제</button></div>';
				}
				$("#result2").html(str);
			}
			function deletemark(name)
				{
					markers.delete(name);
					retres();
				};
			retres();
			initTmap();
		`;
		script.type = "text/javascript";
		script.async = "async";
		document.head.appendChild(script);
		}
	}, [nearTour]);

	return (
		<div id="map_div"/>
	);
}


//axios Test//
// function sendaxios()
// {
//   // 3. 경로탐색 API 사용요청
//   // let headers = {
//   //   'content-type': 'application/x-www-form-urlencoded',
//   //   'appKey': 'l7xx34194c87b04c4474abec384877be1ee4'
//   // };
  
//   let body = {
//     'startX': "126.9850380932383",
//     'startY': "37.566567545861645",
//     'endX': "127.10331814639885",
//     'endY': "37.403049076341794",
//     'reqCoordType': "WGS84GEO",
//     'resCoordType': "EPSG3857",
//     'searchOption': '0',
//     'trafficInfo': 'Y'
//   };
//   let dd = qs.stringify(body);
//   axios.post("https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",dd,
//   {
//     headers:{'appKey': 'l7xx34194c87b04c4474abec384877be1ee4'}
//   }).then((res) => {console.log(res)}).then((err) => {console.log(err)});
// }
//axios Test end//

function FullScreenMap() 
{

	//axios
  return (
    <>
      <div className="content">
            <Card>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                
              <div id="map_wrap" class="map_wrap">
			  <div class="row btn-row g-3" style={{marginTop:"30px"}}><p class="col-lg-4" id="mapty"/>
			  <p class="col-lg-8" id="result"/></div>
              <MapWrapper/>
			  
              </div>
              <div class="map_act_btn_wrap clear_box"></div>
              <br />
                </div>
              </CardBody>
            </Card>
      </div>
    </>
  );
}
export default FullScreenMap;