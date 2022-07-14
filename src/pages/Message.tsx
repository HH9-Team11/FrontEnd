import { useEffect, useState} from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Cookies from 'universal-cookie';

import styled from 'styled-components';

import { FaArrowCircleRight } from 'react-icons/fa';
import { FaArrowCircleLeft } from 'react-icons/fa';

import { RootState, useAppDispatch } from '../redux/configureStore';
import { msgActionCreators } from '../redux/modules/message';
import { useSelector } from 'react-redux';

import { msgApis } from '../apis/messageApis';
import { useQuery } from 'react-query';


interface newMsgList {
    sender : string,
    username : string,
    senderId : number,
    receiver : string,
    content : string,
    unReadCount: number,
}

export default function Message() {
    const cookies = new Cookies();
    // const location = useLocation();
    // console.log(location);

    const appDispatch = useAppDispatch();
    // const msgList = useSelector((store: RootState) => store.msg.msgList);
    
    //const [new_msgList, new_setMsgList] = useState(msgList);
    // let __msgList:Array<string | number> = []; 
    //console.log(msgList);

    const res = useQuery(['msgList'], () => msgApis.getMsg(),
            // {
            //     staleTime: 0,
            //     cacheTime: 0,
            // }
    ); // API 호출
    // console.log(res)

    useEffect(() => {
        // appDispatch(msgActionCreators.getMsgListDB());
        
        // const fetchData = async () => {
        //     const result = await 
        //     //console.log("새로운 데이터?", result);
        // };
        // fetchData();

        //if (location.pathname === "/messageList") { appDispatch(msgActionCreators.getMsgListDB()); }
    }, []);

    if(res.data){
        const msgList: newMsgList[] = res.data.data.data;
        // console.log(msgList);

        return (
            <Wrap>
                <Box>
                <ListBox>
                
                  {
                      msgList.map((data:any, index) => {
                        const receiver:object = data.receiver.username;
                        const sender:object = data.receiver.username;
                        console.log(data)
                        
                          return(
                              <Msg key={index}>
                                  <MsgHead>
                                      <div>보낸사람 : {sender}</div>
                                      <div>받는사람 : {receiver}</div>
                                      {
                                          data.senderId === parseInt(cookies.get("userId"))
                                          ? <FaArrowCircleRight> </FaArrowCircleRight>
                                          : <FaArrowCircleLeft> </FaArrowCircleLeft>
                                      }
                                  </MsgHead>
                                  <MsgContent>
                                      {data.content}
                                  </MsgContent>
                              </Msg>
                          );
                      })
                  }
                  </ListBox>
                </Box>
            </Wrap>
          )
    }

    return (
        <Wrap>
            <Box>쪽지가 없습니다!</Box>
        </Wrap>
    )
  
}

const Wrap = styled.div`
  display: flex;
  background-color: #e9d5ca;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Box = styled.div`
  background-color: white;
  width: 414px;
  text-align: center;
  height: 100vh;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 420px);
  margin-top : 50px;
`;

const Msg = styled.div`
  background-color: lightgrey;
  color: #827397;
  margin-top: 50px;
  text-align: center;
`;

const MsgHead = styled.div`
    display : flex;
    justify-content: space-between;
    margin : 10px;
`

const MsgContent = styled.div`
    display : flex;
    margin : 20px 10px 10px 10px;
`
