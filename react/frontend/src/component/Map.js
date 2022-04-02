import React, { useEffect, useState, useRef } from 'react';
//import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import closebutton from './img/close-button.png'

export default function Map() 
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
              map: map
            });
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