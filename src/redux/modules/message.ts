import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { msgApis } from '../../apis/messageApis';

const cookies = new Cookies();

interface MsgList {
  sender: string,
  senderId: number,
  receiver: string,
  content: string,
  unReadCount: number,
}

interface MsgState {
  msgList: Array<MsgList>;
}

interface Msg {
  senderId: number,
  receiverId: number,
  content : string,
}

const initialState:MsgState = {
  msgList : [],
};

//쪽지 리스트 가져오기
export const getMsgListDB = createAsyncThunk(
  'api/communicator/',
  async (data, thunkAPI) => {
    try {
      await msgApis.getMsg().then((res) => {
        console.log(res);
        const newMsgList: Array<MsgList> = [];

        res.data.data?.map((msg: any) => {
          
          newMsgList.push({
            sender: msg.sender.username,
            senderId: msg.sender.userId,
            receiver: msg.receiver.username,
            content: msg.content,
            unReadCount: msg.unReadCount,
          });
        });
        thunkAPI.dispatch(setMsgList(newMsgList));
      });
    } catch (error) {
      console.log(error);
    }
  }
);


//쪽지 보내기
export const msgPostDB = createAsyncThunk(
  'api/message',
  async (data:Msg, thunkAPI) => {
    try {
      await msgApis.sendMsg(data).then((res) => {

        const msgData = {
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
        };
        thunkAPI.dispatch(postMsg(msgData));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const msgSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
    setMsgList: (
      state,
      action: PayloadAction<Array<MsgList>>
    ) => {
      return { msgList: action.payload };
    },

    postMsg: (state, action: PayloadAction<Msg>) => {
      const new_msgList = [
        {
          senderId: action.payload.senderId,
          receiverId: action.payload.receiverId,
          content: action.payload.content,
        },
        ...state.msgList,
      ];
      return { ...state, list: new_msgList };
    },

  },
});

export const { setMsgList, postMsg } = msgSlice.actions;
const msgActionCreators = {
  getMsgListDB,
  msgPostDB,
}

export default msgSlice;
export {msgActionCreators};
