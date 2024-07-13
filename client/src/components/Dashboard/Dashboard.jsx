import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage"

const Dashboard = () => {
    const navigate = useNavigate()
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    const logout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload();
    }

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className='bg-gray-200 py-8 md:px-12 px-6 min-h-screen'>
                <div className="md:flex">
                    <div className="bg-white py-4 px-2 rounded md:w-[30%] shadow-md">
                        <div className="">
                            <h1 className="text-xl text-gray-500 font-semibold px-4 pb-2">Chats</h1>
                            <hr />
                        </div>
                    </div>  
                    <div className="bg-white rounded w-full md:ml-4 md:my-0 mt-4 shadow-md p-2 md:px-4 md:py-6">
                        hi all
                    </div>
                </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        })
    }
}

export default Dashboard