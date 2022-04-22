import React, { useEffect, useState, useRef } from 'react';
//import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

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

  return (
    <div class="col-lg-7" style={{paddingRight:0}}>
        <div id="TMapApp" style={{position:'sticky'}} ref={stickyChange}></div>
    </div>
  );
}