import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSlice from './modules/user';
import mypageSlice from './modules/mypage';
import msgSlice from './modules/message';


const rootReducer = combineReducers({
  user: userSlice.reducer,
  mypage : mypageSlice.reducer,
  msg : msgSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
