import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApis } from '../../apis/userApis';

const initialState = {
  isLogin: false,
};

export const login = createAsyncThunk('/user/login', async () => {
  try {
    await userApis.login().then((data) => {
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.isLogin = true;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice;
