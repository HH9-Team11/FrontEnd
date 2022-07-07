import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { userApis } from '../../apis/userApis';

const cookies = new Cookies();

interface Login {
  username: string;
  password: string;
}

const initialState = {
  isLogin: false,
};

export const login = createAsyncThunk(
  '/user/login',
  async (loginData: Login) => {
    try {
      await userApis.login(loginData).then((data) => {
        console.log(data.headers.authorization);
        const accessToken = data.headers.authorization;
        const tokenData = jwtDecode(accessToken);
        console.log(tokenData);
        cookies.set('accessToken', accessToken, {
          path: '/',
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state = action.payload;
      state.isLogin = true;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice;
