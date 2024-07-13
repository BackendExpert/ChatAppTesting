import React, { useEffect } from 'react'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ ProtectRoute }) => {
    const navigate = useNavigate()
    const loginToken = localStorage.getItem("token");
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    if(loginToken !== null || EmailUser !== null  || RoleUser !== null){
        return (
            ProtectRoute
        )
    }
    else{
        useEffect(() => {
            localStorage.clear()            
            navigate('/')
            window.location.reload()
        }, [])
    }
}

export default PrivateRoute