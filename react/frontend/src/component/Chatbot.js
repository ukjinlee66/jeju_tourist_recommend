import React, {useState} from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import ReturnTour from './ReturnTour';

const theme = {
    background: '#706F6F',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#f89b00',
    headerFontColor: '#FFFFFF',
    headerFontSize: '15px',
    botBubbleColor: '#f89b00',
    botFontColor: '#000000',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  }
  
function Chatbot(props) {

    return (
        <ThemeProvider theme={theme}>
            <ChatBot
            headerTitle="for dydrhkd"
            steps={[
                {
                    id: '0',
                    message: '어떤 여행을 원하는가?',
                    trigger: '1',
                },
                {
                    id: '1',
                    user: true,
                    trigger: '2'
                },
                {
                    id: '2',
                    component: <ReturnTour/>,
                    asMessage: true,
                    end:true
                },
            ]}
            />
        </ThemeProvider>
    )
}

export default Chatbot;