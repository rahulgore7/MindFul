import {
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    EDIT_USER_FAIL,
    EDIT_USER_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST
} from "../constants/userConstants"
import axios from 'axios';
import BASE_URL from "../config";
const apiUrl = `${BASE_URL}`;

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${apiUrl}/logout`);

        dispatch({ type: LOGOUT_SUCCESS });
        localStorage.removeItem('token');
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL });
    }
};

//delete user

// delete user

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`${apiUrl}/edit/${id}`);
        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(`${apiUrl}/allUsers`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

//edit user:
export const editUser = (id, userData) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${apiUrl}/updates/${id}`, userData);

        dispatch({ type: EDIT_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EDIT_USER_FAIL,
            payload: error.response.data.message
        });
    }
};

export const getUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        // Fetch all users (you may need to adjust the endpoint accordingly)
        await dispatch(getAllUsers());

        // Get the updated state
        const state = getState();

        // Find the user by ID
        const user = state.allUsers.users.find((user) => user._id === id);

        if (!user) {
            throw new Error('User not found');
        }

        dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.message,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${apiUrl}/login`,
            { email, password },
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });
        localStorage.setItem('token', data.user.token);
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response ? error.response.data.message : 'Invalid email or password'
        })
    }
}

// authActions.js
export const checkAuthStatus = () => async (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // No token found, the user is not authenticated
        dispatch(logout());
        return false;
    }

    try {
        // Verify the token on the server side
        const response = await axios.post(`${apiUrl}/verify`, { token });

        // If the token is valid, dispatch the login action with user data
        const user = response.data.user;
        dispatch(login(user));
        console.log('Authentication success');
        return true;
    } catch (error) {
        console.error('Error verifying token:', error);
        dispatch(logout());
    }
};

//Get signed in user details
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`${apiUrl}/me`);
        console.log(data)

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};


