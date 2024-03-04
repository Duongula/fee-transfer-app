import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';
import transferReducer from '../redux/transfer/transferSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transfer: transferReducer
  },
});