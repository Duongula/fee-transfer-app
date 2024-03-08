import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';
import transferReducer from '../redux/transfer/transferSlice';
import accountReducer from '../redux/account/accountSlice';
import feeReducer from '../redux/fee/feeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transfer: transferReducer,
    account: accountReducer,
    fee: feeReducer,
  },
});