import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BsPerson, BsPersonCircle, BsPower, BsSendFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage"
import io from 'socket.io-client';

const socket = io('http://localhost:5173');

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

    // when click  any contecnt get data and display in div
    const [CurrentChat, SetCurrentChat] = useState([])
    const [MessageSelected, SetMessageSelected] = useState(false)
    const [GetCurrentChatMsgs, SetGetCurrentChatMsgs] = useState([])

    const GetCurrentChat = async (id) => {
        // alert(id)
        SetCurrentChat(id)
        SetMessageSelected(true)
    }

    useEffect(() => {
        const id = CurrentChat
        axios.get(`http://localhost:5000/message/GetMessages/${EmailUser}/${id}`)
        .then (res => SetGetCurrentChatMsgs(res.data.Result))
        .catch(err => console.log(err))  
    })

    // useEffect(() => {
    //     GetCurrentChat()
    //     socket.on('chat message', (newMsg) => {
    //         SetMsg((prevMessages) => [...prevMessages, newMsg]);
    //     });

    //     return () => {
    //         socket.off('chat message');
    //     };
    // }, [])

    const [Msg, SetMsg] = useState({
        MessageSend: ''
    })

    // MsgContent
    const MsgContent = useRef(null)

    useEffect(() => {

    }, []);

    // send msg

    // form only reload chat div

    const headleSendMsg = (e) => {
        e.preventDefault();
        SetMessageSelected(true)        

        // when type and send message the conent of Chat will be scroll to down
        if (MsgContent.current) {
            MsgContent.current.scrollTop = MsgContent.current.scrollHeight;
        }

        const MessageContnet = { EmailUser, Msg, CurrentChat}

        axios.post('http://localhost:5000/message/SendMessage', MessageContnet)
        socket.emit('chat message', Msg.MessageSend );
        SetMsg({ MessageSend: ''})



    }


    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className='bg-gray-200 py-8 md:px-12 px-6 min-h-screen'>
                <div className="bg-white md:hidden block">
                    <div className="flex justify-between py-4 px-4 mb-3 rounded shadow-md">
                        <div className="">
                            <div onClick={headlelogout} className="cursor-pointer flex text-red-500"><BsPower className='h-6 w-auto'/> Logout</div>
                        </div>
                        <div className="flex text-gray-500">
                            <BsPersonCircle className='text-right h-6 w-auto'/>     
                            <p className="pl-2">{EmailUser}</p>                               
                        </div>
                    </div>
                </div>
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

                                    <div className="">
                                        {
                                            MyContacts.map((MyChats, index) => {
                                                if(MyChats.starter === EmailUser) {
                                                    return (
                                                        <div onClick={() => GetCurrentChat(MyChats.receiver)} className="duration-500 hover:bg-gray-200 cursor-pointer flex text-gray-500 bg-gray-100 my-2 py-4 px-2 rounded">
                                                            <BsPersonCircle className='h-6 w-auto'/>
                                                            <p className="pl-2 ">{MyChats.receiver}</p>
                                                        </div>                                                        
                                                    )
                                                }
                                                else if(MyChats.receiver === EmailUser){
                                                    return (
                                                        <div onClick={() => GetCurrentChat(MyChats.starter)} className="duration-500 hover:bg-gray-200 cursor-pointer flex text-gray-500 bg-gray-100 my-2 py-4 px-2 rounded">
                                                            <BsPersonCircle className='h-6 w-auto'/>
                                                            <p className="pl-2 ">{MyChats.starter}</p>
                                                        </div>  
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div className="w-full">
                        <div className="md:block hidden bg-white rounded w-full md:ml-4 md:my-0 md:mb-2 mt-4 shadow-md p-2 md:px-4 md:py-6">
                            <div className="flex justify-between">
                                <div className="">
                                    <div onClick={headlelogout} className="cursor-pointer flex text-red-500"><BsPower className='h-6 w-auto'/> Logout</div>
                                </div>
                                <div className="flex text-gray-500">
                                    <BsPersonCircle className='text-right h-6 w-auto'/>     
                                    <p className="pl-2">{EmailUser}</p>                               
                                </div>
                            </div>
                        </div>
                        <div className="h-[600px] bg-white rounded w-full md:ml-4 md:my-0 mt-4 shadow-md p-2 md:px-4 md:py-6">
                            {
                                (() => {
                                    if(MessageSelected === true){
                                        return (
                                            <>
                                                <div className="">
                                                    <div className="flex text-gray-500">
                                                        <BsPersonCircle className='h-6 w-auto pr-2'/>
                                                        {CurrentChat}
                                                    </div>
                                                </div>
                                                <hr className='my-2'/>

                                                <div className="flex flex-col h-full">
                                                    <div ref={MsgContent} className="overflow-y-auto max-h-[460px] mb-2 scrollbar-hide">
                                                        {
                                                            GetCurrentChatMsgs.map((ChatMsg, index) => {
                                                                if(ChatMsg.sender === EmailUser){
                                                                    return (
                                                                        <div className="" key={index}>
                                                                            {EmailUser} + {ChatMsg.messgaeContent}
                                                                        </div>
                                                                    )
                                                                }
                                                                else if(ChatMsg.sender === CurrentChat){
                                                                    return (
                                                                        <div className="" key={index}>
                                                                            {CurrentChat} + {ChatMsg.messgaeContent}
                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }
                                                    </div>
                                                    <div className="md:mb-8 mb-10">
                                                        <form method='post' onSubmit={headleSendMsg}>
                                                            <div className="flex justify-between">
                                                                <input type="text" name="" id="" className="h-12 w-full bg-gray-200 pl-2 rounded" required placeholder='Message'
                                                                value={Msg.MessageSend} onChange={e => SetMsg({...Msg, MessageSend:e.target.value})}/>
                                                                <button type="submit" className='pl-4'>
                                                                    <BsSendFill className='text-blue-500'/>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    else{
                                        return (
                                            <div className="">Select Chat or Start New Chat</div>
                                        )
                                    }
                                })()
                            }
                        </div>
                    </div>                
                </div>
                <div className='text-gray-600 pb-4 px-4 text-sm text-center mt-4'>
                    Copyright &copy; 2024 | Online Chat App | All Right Reserved | v1.0.0<br />
                    Designed and Developed By : <a href=""><span className="text-blue-500">JehanKandy</span></a>
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