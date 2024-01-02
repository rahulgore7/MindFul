// authReducer.js
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/userConstants"


const isAuthenticatedFromStorage = !!localStorage.getItem('token');
const authReducer = (state = { user: {}, isAuthenticated: isAuthenticatedFromStorage }, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        // Other cases for handling different actions
        default:
            return state;
    }
};

export default authReducer;
