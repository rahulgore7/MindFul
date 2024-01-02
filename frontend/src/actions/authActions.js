// authActions.js
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/userConstants'
export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload:  data.user ,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});
