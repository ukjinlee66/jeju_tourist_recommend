import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import Chatbot from './Chatbot';

function ChatButton(props) {

    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
            className='btn btn-lg btn-primary bg-jeju-nav btn-lg-square chat-btn' 
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
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