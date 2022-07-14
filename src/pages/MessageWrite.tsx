import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../redux/configureStore';
import { msgPostDB } from '../redux/modules/message';

export default function MessageWrite() {

    const cookies = new Cookies();

    const history = useHistory();
    const appDispatch = useAppDispatch();
    const [content, setContent] = useState<string>('');

    const ContentFrom = (e : ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const sendMsg = () => {
        appDispatch(msgPostDB({ senderId : parseInt(cookies.get("userId")), receiverId : 16, content : content}));
        // history.replace("/messageList");
    }

// console.log(content);

  return (
    <Wrap>
        <Box>
            <div>아이디(닉네임)</div>
            <textarea placeholder='내용을 입력하세요' autoFocus maxLength={200} onChange={ContentFrom}/>
            
            {
                content === '' || !content
                ? <button disabled>SEND</button>
                : <button onClick={sendMsg}>SEND</button>
            }
        </Box>
      
    </Wrap>
  ) 
}

const Wrap = styled.div`
    display : flex;
    background-color : #E9D5CA;
    align-items : center;
    justify-content : center;
    height : 100vh;
`

const Box = styled.div`
    background-color : white;
    width : 414px;
    height : 100vh;
    
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;

    textarea {
        width : 360px;
        height : 400px;
        resize : none;
        border : none;
        background-color : lightgrey;
        padding : 10px;
        margin : 30px;
    }

    textarea:focus{
        outline : none;
    }

    button{
        all: unset;
            background-color : #363062;
            color : white;
            font-size : 14px;
            font-weight : 700;
            padding : 5px;
            text-align : center;
            border-radius : 5px;
            width : 50px;
            height : 30px;
        cursor : pointer;
    }
`