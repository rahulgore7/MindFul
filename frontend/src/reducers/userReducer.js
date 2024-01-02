import { LOGOUT_FAIL, LOGOUT_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, EDIT_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_SUCCESS } from "../constants/userConstants"

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const profileReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_USER_SUCCESS:
            const updatedUsers = state.users.filter(user => user._id !== action.payload.user._id);
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
                users: updatedUsers,
            };
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case EDIT_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user
            };
        case EDIT_USER_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};


export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};