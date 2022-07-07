import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export default function Mypage() {
    const history = useHistory();

  return (
    <Wrap>
        <Box>
            <ImageBox>
                <img src="https://i.pinimg.com/564x/aa/f0/a9/aaf0a937ef732705d82a7df16bdc1c14.jpg" />
                <button onClick={()=>{history.push("/")}}>수정</button>
            </ImageBox>

            <ListBox>
                <div>이름 : 강쥐</div>
                <div>크기 : 소형</div>
                <div>나이 : 2세</div>
                <div>성별 : 여</div>
                <div>주소지 : 서울시~</div>
            </ListBox>
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
    text-align : center;
    height : 100vh;
`

const ImageBox = styled.div`
    position : relative;
    img{
        width : 414px;
        height : 414px;
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
            width : 30px;
        position : absolute;
        left : 360px;
        top : 10px;
        cursor : pointer;
    }
`

const ListBox = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: center;
    height : calc(100% - 420px);

    div {
        color : #827397;
        margin-top : 50px;
        text-align : center;
    }
`