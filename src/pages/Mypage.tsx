import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import { mypageActionCreators } from '../redux/modules/mypage';
import { RootState, useAppDispatch } from '../redux/configureStore';
import { useSelector } from 'react-redux';

export default function Mypage() {

    interface UserInfo {
        USER_ID : number,
     }

    const history = useHistory();
    const cookies = new Cookies();
    const appDispatch = useAppDispatch();

    React.useEffect(() => {
        const userInfo = cookies.get("accessToken");
        const tokenData:UserInfo = jwtDecode(userInfo);
        const userId = tokenData.USER_ID;
        cookies.set("userId", userId);

        appDispatch(mypageActionCreators.mypage(userId));
      }, []);

    const userInfoData = useSelector((store: RootState) => store.mypage);

  return (
    <Wrap>
        <Box>
            <ImageBox>
                <img src={userInfoData.img} />
                <button onClick={()=>{history.push("/")}}>수정</button>
            </ImageBox>

            <ListBox>
                <div>이름 : {userInfoData.name}</div>
                <div>크기 : {userInfoData.size}</div>
                <div>나이 : {userInfoData.age}세</div>
                <div>성별 : {userInfoData.gender}</div>
                <div>주소지 : {userInfoData.address}</div>
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