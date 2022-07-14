import instance from '../lib/axios';

export const mypageApis = {
  mypage: (userId : number) => instance.get(`/user/info/${userId}`),
};
