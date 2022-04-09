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
            headerTitle="recommend Chatbot"
            steps={[
                {
                    id: '0',
                    message: '어떤 여행을 원하세요?',
                    trigger: '1',
                },
                {
                    id: '1',
                    user: true,
                    trigger: '2'
                },
                {
                    id: '2',
                    message: '아래 관광지명 클릭시 검색페이지로 이동됩니다.',
                    trigger: '3'
                },
                {
                    id: '3',
                    component: <ReturnTour/>,
                    asMessage: true,
                    trigger: '4'
                },
                {
                    id: '4',
                    options: [
                        { value: 1, label: '다른 추천 받기', trigger: '0' },
                        { value: 2, label: '챗봇 종료', end:true }
                    ],
                }
            ]}
            />
        </ThemeProvider>
    )
}

export default Chatbot;