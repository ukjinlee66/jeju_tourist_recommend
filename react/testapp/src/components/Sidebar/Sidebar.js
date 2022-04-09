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
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import logo from "logo-white.svg";
import { resolveTripleslashReference } from "typescript";

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
  React.useEffect(() => {
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
      <div className="logo">
        <a
          href="https://www.creative-tim.com?ref=nudr-sidebar"
          className="simple-text logo-mini"
          target="_blank"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a
          href="https://www.creative-tim.com?ref=nudr-sidebar"
          className="simple-text logo-normal"
          target="_blank"
        >
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <form>
            <InputGroup className="no-border">
              <Input placeholder="관광지 검색..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="now-ui-icons ui-1_zoom-bold" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          {props.routes.map((prop, key) => 
          {
            if (prop.redirect) return null;
            return (
              
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                {/* 왼쪽 메뉴 부분 출력하는 부분 */}
                {ret_list()}
                <button onClick={()=>Sendinfo()}>적용</button>
                </NavLink>
              
            );
          })}
        </Nav>
      </div>
    </div>
  );
}
function temp()
{
  return(
    <div>
      {()=>retres()}
    </div>
  );
}
function ret_list()
{
  console.log("call ret_list()");
  var attr_arr = ['관광지1','관광지2','관광지3','관광지4','관광지5'];
  var attr_arr2 = temp();
  for(var i =0;i<attr_arr2.length;i++)
  {
    console.log(attr_arr2[i]);
  }
  // console.log('attr_arr2 list : ', Object.getOwnPropertyNames(attr_arr2));
  const attr_list = attr_arr.map((name) => <li>{name}</li>)
  return(
    <div>
      {/* 추후 각 관광지 정보에 따른 리스트에서 제거하는 버튼 뒷부분 추가 첫번째와 마지막 순서의
      원소를 출발지와 도착지라 가정한다. */}
      <li>{attr_list}</li>
    </div>
  );
}
export default Sidebar;
