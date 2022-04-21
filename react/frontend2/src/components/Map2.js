import React, { useEffect, useState, useRef } from 'react';
//import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import closebutton from '../assets/img/close-button.png'

export default function Map2() 
{ 
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장 

  // useRef를 통해 css 변경
  const stickyChange = useRef(null);
  
  function handleScroll() { 
      setScrollY(window.pageYOffset);
      if(ScrollY > 300) {
          stickyChange.current.style.top = '75px';
      } else {
          stickyChange.current.style.top = '-100px';
      }
  }

  useEffect(() => {
      function scrollListener() {  window.addEventListener("scroll", handleScroll); } //  window 에서 스크롤을 감시 시작
      scrollListener(); // window 에서 스크롤을 감시
      return () => { window.removeEventListener("scroll", handleScroll); }; //  window 에서 스크롤을 감시를 종료
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
        var map;
        let attr_list = ["관광지1",[33.5200,126.51555],"관광지2",[33.5030,126.50235],"관광지3",[33.5030,126.49235],"관광지4",[33.5030,126.48235]];
        //attr_list = sessionStorage.getItem("attr_arr");
        function initTmap() 
        {
          var lat;
          var lng;
          console.log("initmap");
            map = new Tmapv2.Map("TMapApp", {
                center: new Tmapv2.LatLng(33.4000,126.51555),
                width: "100%",
                height: "60%",
                zoom:10
            });
            let cnt = 1;
            for(let i = 0; i < attr_list.length;i+=2)
            {
              let str="";
              let marker;
              let title1 = attr_list[i];
              let label="<span style='background-color: #46414E;color:white'>"+attr_list[i]+"</span>";
              //Marker 객체 생성.
              lat = attr_list[i+1][0];
				      lng = attr_list[i+1][1];
              marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(lat, lng), //Marker의 중심좌표 설정.
                title: title1,
                label: label
              });
              marker.setMap(map); //Marker가 표시될 Map 설정.
              lat = attr_list[i+1][0];
				      lng = attr_list[i+1][1] + " " + lat;
              str = '<button class="col-md-2" value="'+lng+'" type="button" onclick="center_map(this.value);return false;">맵중앙이동</button>';
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
    document.head.appendChild(script);
  }, []);

  return (
    <div class="col-lg-7" style={{paddingRight:0}}>
        <div id="TMapApp" style={{position:'sticky'}} ref={stickyChange}></div>
    </div>
  );
}