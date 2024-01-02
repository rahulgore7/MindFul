import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'
import { profileReducer } from './reducers/userReducer'
import { allUsersReducer } from './reducers/userReducer'
import authReducer from './reducers/authReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        allUsers: allUsersReducer,
        auth: authReducer
    }
});

export default store;
