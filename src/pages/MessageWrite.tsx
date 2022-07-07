import * as React from 'react';
import styled from 'styled-components';

export default function MessageWrite() {
  return (
    <Wrap>
        <Box>
            <div>아이디(닉네임)</div>
            <textarea/>
            <button>SEND</button>
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