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
/*eslint-disable*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import logo from '../../assets/img/logo.png';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

var ps;
console.important = function(text) 
{
  ReactDOM.render(
    InputGroupText.props.Input
  );
}
function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => 
  {
    const script = document.createElement("script");
    let tt = 2;
    let arr = [1,2,3,4];
    script.innerHTML += `let abc = 1;`;
    sessionStorage.setItem("test",arr);
    document.head.appendChild(script);
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div className="sidebar" data-color={props.backgroundColor}>
        <a href="/jeju" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
              <img class="logo" src={logo} />
        </a>
      <div className="sidebar-wrapper" ref={sidebar}>
        {/* 왼쪽 메뉴 부분 출력하는 부분 */}
        <p id="result2"/>
        <button onClick={()=>Sendinfo()}>적용</button>
        <p id="init_map"/>
      </div>
    </div>
  );
}

export default Sidebar;
