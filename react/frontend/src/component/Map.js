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
        function initTmap() {
            var map = new Tmapv2.Map("TMapApp", {
                center: new Tmapv2.LatLng(33.4000,126.51555),
                width: "100%",
                height: "100%",
                zoom:10
            });
        }
        
        initTmap();
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);

  return (
    <div class="col-lg-7">
        <h1 class="text-center mb-5">&nbsp;<br/><br/><br/></h1>
        <div class="mb-5"/>
        <div id="TMapApp"/>
    </div>
  );
}