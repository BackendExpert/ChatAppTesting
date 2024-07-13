import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsPerson, BsPersonCircle, BsPower } from 'react-icons/bs';
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

    // get all users to select
    const [AllUsers, SetAllUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/user/GetAllUser/'+ EmailUser)
        .then(res => SetAllUsers(res.data.Result))
        .catch(err => console.log(err))
    }, [])



    // select user and add to contacts
    const [addtoContact, SetaddtoContact] = useState({
        contactUser: '',
    })

    const headleAddUser = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post(`http://localhost:5000/contact/StartContact/${EmailUser}`, addtoContact)
            .then(res => {
                if(res.data.Status === "Success"){
                    alert("Connection Started Successful")
                    window.location.reload()
                }
                else{
                    alert(res.data.Error)
                }
            })
        }   
        catch (err) {
            console.log(err)
        }
    }

    // logout
    const headlelogout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }

    // get my chat
    const [MyContacts, SetMyContacts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/contact/MyChats/'+ EmailUser)
        .then(res => SetMyContacts(res.data.Result))
        .catch(err => console.log(err))
    }, [])


    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className='bg-gray-200 py-8 md:px-12 px-6 min-h-screen'>
                <div className="md:flex">
                    <div className="bg-white py-4 px-2 rounded md:w-[30%] shadow-md">
                        <div className="">
                            <h1 className="text-xl text-gray-500 font-semibold px-4 pb-2">Chats</h1>
                            <hr />

                            <div className="mx-4 mt-4">
                                <form method="post" onSubmit={headleAddUser}>
                                    <select name="" id="" className='w-full h-12 rounded bg-gray-200 pl-2' required onChange={e => SetaddtoContact({...addtoContact, contactUser:e.target.value})}>
                                        <option value="">Select User</option>
                                        {
                                            AllUsers.map((user, index) => {
                                                return (
                                                    <option key={index} value={user.email}>{user.email}</option>  
                                                )
                                            })
                                        }
                                    </select>

                                    <div className="">
                                        <button type="submit" className='my-2 bg-green-600 py-2 px-4 rounded text-white duration-500 hover:bg-green-800'>Start Chat</button>
                                    </div>
                                </form>
                            </div>
                            <div className="">
                                <hr />
                            </div>
                            <div className="my-4">
                                <div className="">
                                    <h1 className="text-gray-500 text-xl font-semibold px-4">My Chats</h1>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div className="w-full">
                        <div className="bg-white rounded w-full md:ml-4 md:my-0 md:mb-2 mt-4 shadow-md p-2 md:px-4 md:py-6">
                            <div className="flex justify-between">
                                <div className="">
                                    <div onClick={headlelogout} className="cursor-pointer flex text-red-500"><BsPower className='h-6 w-auto'/> Logout</div>
                                </div>
                                <div className="flex text-gray-500">
                                    <BsPersonCircle className='text-right h-6 w-auto'/>     
                                    <p className="pl-2">jehan@123.com</p>                               
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded w-full md:ml-4 md:my-0 mt-4 shadow-md p-2 md:px-4 md:py-6">
                            hi all
                        </div>
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