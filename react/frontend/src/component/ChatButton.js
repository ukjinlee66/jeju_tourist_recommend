import React, { Fragment, useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import Collapse from 'react-bootstrap/Collapse'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Chatbot from './Chatbot';

function ChatButton(props) {

    const [open, setOpen] = useState(false);

    const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장 

    // useRef를 통해 css 변경
    const btnChange = useRef(null);
    
    function handleScroll() { 
        setScrollY(window.pageYOffset);
        if(ScrollY > 300) {
            btnChange.current.style.bottom = '45px';
        } else {
            btnChange.current.style.bottom = '-100px';
        }
    }

    useEffect(() => {
        function scrollListener() {  window.addEventListener("scroll", handleScroll); } //  window 에서 스크롤을 감시 시작
        scrollListener(); // window 에서 스크롤을 감시
        return () => { window.removeEventListener("scroll", handleScroll); }; //  window 에서 스크롤을 감시를 종료
    });

    return (
      <>
        <Button
            className='btn btn-lg btn-primary bg-jeju-nav btn-lg-square chat-btn' 
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            ref={btnChange}
        ><i class="bi bi-chat"></i>
        </Button>
        <div style={{position:'fixed', right: '100px', bottom: '45px', zIndex:'100'}}>
          <Collapse in={open} >
            <div id="example-collapse-text">
              <Chatbot />
            </div>
          </Collapse>
        </div>
      </>
    );
}

export default ChatButton;