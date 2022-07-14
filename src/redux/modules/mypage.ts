import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mypageApis } from '../../apis/mypageApis';

interface userInfoCountType {
    address : string,
        age : number,
        img : string,
        name : string,
        size : string,
        gender : string,
}

const initialState: userInfoCountType= {
    address : '',
    age : 0,
    img : '',
    name : '',
    size : '',
    gender : '',
};


export const mypage = createAsyncThunk(
  '/user/info/',
  async (userId:number, thunkAPI) => {
    try {
      await mypageApis.mypage(userId).then((response) => {
        console.log(response.data.data);

       const userInfo = {
        address : response.data.data.address,
        age : response.data.data.petAge,
        img : response.data.data.petImgUrlList[0],
        name : response.data.data.petName,
        size : response.data.data.petSizeType,
        gender : response.data.data.petGenderType,
       };

       thunkAPI.dispatch(setMypage(userInfo));
      });
    } catch (err) {
      console.log(err);
    }
  }
);


export const mypageSlice = createSlice({
  name: 'mypage',
  initialState,
  reducers: {
    setMypage: (state, action: PayloadAction<userInfoCountType>) => {
        return { ...state, ...action.payload };
      },
  },
});

export const { setMypage } = mypageSlice.actions;
const mypageActionCreators = {
    mypage,
}

export default mypageSlice;
export { mypageActionCreators };