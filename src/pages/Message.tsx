import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {FaArrowCircleRight} from 'react-icons/fa'
import {FaArrowCircleLeft} from 'react-icons/fa'


export default function Message() {
  return (
      <Wrap>
          <Box>
              <ListBox>
                <Msg>
                    <MsgHead>
                        <div>아이디(닉네임)</div>
                        <FaArrowCircleRight>아아아</FaArrowCircleRight>
                    </MsgHead>
                    <div>
                        쪽지내용
                    </div>
                </Msg>
                <Msg>
                    <MsgHead>
                        <div>아이디(닉네임)</div>
                        <FaArrowCircleLeft>아아아</FaArrowCircleLeft>
                    </MsgHead>
                    <div>
                        쪽지내용
                    </div>
                </Msg>


                  <Msg>쪽지1</Msg>
                  <Msg>쪽지1</Msg>
                  <Msg>쪽지1</Msg>
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


const ListBox = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: center;
    height : calc(100% - 420px);
`

const Msg = styled.div`
    background-color : lightgrey;
    color : #827397;
    margin-top : 50px;
    text-align : center;
`

const MsgHead = styled.div`
    display : flex;
    justify-content: space-between;
    margin : 10px;
`