import React from 'react'
import {Navigate, Outlet} from'react-router-dom'

const PrivateRoute = ({isAuthenticated, children})=>{
    if(!isAuthenticated){
        return <Navigate to={"/login"}/>
    }
    return <Outlet />;
}
export default PrivateRoute;
