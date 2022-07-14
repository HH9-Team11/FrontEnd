import instance from '../lib/axios';

interface sendMsgType {
  senderId: number,
  receiverId: number,  //말이 안됨 어케 number를 보내요
  content: string,
}

export const msgApis = {
  getMsg: () => instance.get(`/api/message`), 
  sendMsg: (data : sendMsgType) => instance.post(`/api/message`, data, {}),
};
