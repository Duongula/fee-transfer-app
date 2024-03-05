import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';
import transferReducer from '../redux/transfer/transferSlice';
import accountReducer from '../redux/account/accountSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transfer: transferReducer,
    account: accountReducer
  },
});