import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BsPerson, BsPersonCircle, BsPower, BsSendFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage"
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

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

    const GetCurrentChat = (id) => {
        // alert(id)
        SetCurrentChat(id)
        SetMessageSelected(true)


        
    }

    const [Msg, SetMsg] = useState({
        MessageSend: ''
    })

    // MsgContent
    const MsgContent = useRef(null)

    // send msg
    const headleSendMsg = (e) => {
        e.preventDefault();
        SetMessageSelected(true)
        SetMsg({ MessageSend: ''})

        // when type and send message the conent of Chat will be scroll to down
        if (MsgContent.current) {
            MsgContent.current.scrollTop = MsgContent.current.scrollHeight;
        }

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
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum facilis impedit dicta rerum illum provident dignissimos esse sed! Laboriosam possimus nihil quo impedit eum, maiores asperiores odio sequi. Mollitia, dignissimos?
                                                        Maxime perferendis ullam officiis repellendus magnam quae tempora eligendi unde asperiores, reiciendis provident nemo, exercitationem ut? Nesciunt, quaerat eaque dolorem delectus veritatis labore eos temporibus amet et dolor officiis distinctio.
                                                        Eius incidunt natus nostrum dignissimos minima magnam commodi perferendis laboriosam blanditiis impedit corrupti animi, deserunt inventore, ullam voluptatum quasi molestias aut porro veritatis? Rerum at totam eum officiis facere est.
                                                        Est fugit hic nobis blanditiis temporibus error cumque omnis similique, nesciunt nemo! Consequuntur, rerum maiores, alias praesentium velit non illum pariatur dicta eligendi nulla numquam commodi provident doloribus maxime nostrum.
                                                        Mollitia amet deleniti quas alias illo esse ipsum perspiciatis recusandae quos ipsa nisi error maxime doloremque corporis repellat ut incidunt non, nesciunt reiciendis nihil ex voluptatibus modi? Aspernatur, nulla alias.
                                                        Fuga doloribus, atque, perspiciatis ex ab unde soluta dolore architecto eveniet natus delectus alias cumque doloremque molestiae maxime cum aperiam, repudiandae quod nobis. Fugit sed aperiam voluptatem obcaecati aliquam aut?
                                                        Consequatur explicabo veniam, exercitationem nemo inventore esse. Excepturi autem doloribus, quis error dolore beatae provident aut maxime, labore reiciendis odit ipsam. Perspiciatis repellat a maxime odit corporis, deleniti dignissimos laboriosam!
                                                        Aliquam labore ipsam ullam, nihil vero atque iste suscipit! Architecto ducimus alias delectus recusandae iusto culpa suscipit mollitia, debitis illo dicta maiores ut dolor molestias earum cupiditate optio assumenda in!
                                                        Illum similique veritatis, libero voluptatibus expedita corporis quis consequuntur facilis quas tenetur eveniet officiis, doloribus sed enim nobis. Laboriosam, hic numquam. Asperiores dolor accusamus recusandae magni amet illo repudiandae assumenda.
                                                        Eum, magnam in praesentium blanditiis voluptatum velit fuga laudantium doloribus quia minus ab temporibus accusantium dolores rerum, veritatis ipsam non totam, facere nulla ad deserunt sint! Quibusdam dolore est ea.
                                                        Reprehenderit quidem explicabo veniam repellat officiis perspiciatis necessitatibus corporis totam similique ad maiores rem expedita beatae culpa odio aliquam id porro ut, voluptatum ab sed. Vero corporis quod iure perspiciatis!
                                                        Minima nesciunt aspernatur repudiandae reiciendis, unde odio maxime officia rem corporis ducimus libero quasi quae neque asperiores praesentium. Architecto iste eveniet vitae doloribus dicta aspernatur in obcaecati impedit esse porro!
                                                        Nisi dolore commodi, veniam voluptates, voluptatem modi eius fugit est tenetur quasi aspernatur soluta dignissimos enim suscipit necessitatibus ipsa delectus tempora, asperiores ullam ducimus. Qui praesentium quia veniam sint rem!
                                                        Provident nostrum, culpa voluptates excepturi beatae ipsum atque aspernatur veritatis pariatur. Veniam architecto, placeat animi obcaecati velit beatae recusandae dolorum mollitia illum, dolorem, aliquam delectus repudiandae quaerat autem voluptates nobis.
                                                        Molestias amet a voluptate, pariatur aliquam tempore cupiditate est aut praesentium illum velit. Eius officia molestias iste sunt incidunt nobis veritatis quis expedita? Harum facilis, dicta repellendus tempore provident reiciendis!
                                                        Obcaecati, consequatur ullam, modi laborum illo nobis aperiam cumque itaque architecto officia, voluptatibus porro mollitia assumenda sit eligendi. Dolorem, quibusdam alias ratione consectetur eveniet unde harum animi soluta ut reprehenderit.
                                                        Quae veritatis molestiae beatae veniam alias obcaecati placeat nostrum, vel temporibus? Voluptates odio accusantium inventore veniam rem quaerat suscipit. Maiores, ratione molestiae assumenda at animi aut facere inventore adipisci rem!
                                                        Et magni neque recusandae non nam debitis excepturi quo, tempore facilis eum ullam impedit deserunt odit necessitatibus dicta, voluptas fuga adipisci tempora. Officiis obcaecati id fugit nesciunt atque aliquid. Veritatis?
                                                        In inventore repellendus fugiat necessitatibus exercitationem consequatur numquam, error iste repellat ratione blanditiis minus. Beatae aliquam recusandae placeat ipsum fugit, commodi mollitia aut ratione provident! Architecto modi maxime eum nisi.
                                                        Reiciendis eveniet excepturi aliquid. Repudiandae aliquam fugit beatae, veniam amet vitae. Praesentium cum nostrum totam velit incidunt, obcaecati fugiat. Nobis, similique. Accusamus voluptas quia quis placeat fugit harum commodi eaque.
                                                        Enim rerum nobis sint fuga debitis, odit, vitae porro molestiae fugiat eius ipsa neque aliquid minus veniam maiores quia in voluptate repudiandae aperiam ad doloribus saepe. Veritatis error ipsum commodi!
                                                        Voluptate placeat, veniam numquam atque ut aut soluta quibusdam aliquam provident aliquid tempore repellat labore nesciunt molestias adipisci vel. Non, quo placeat voluptatem aliquam qui rerum repellendus nam quod vitae?
                                                        Accusamus inventore maxime iure totam nesciunt porro, distinctio, fugiat omnis ut quae minima? Tempore eos officia, soluta deserunt ullam nulla. Molestiae cum ullam vero? Totam cupiditate dolores obcaecati ad suscipit!
                                                        Eaque reiciendis quidem dolorem consectetur, ut maiores reprehenderit adipisci, nemo a culpa, tenetur alias quod sequi quibusdam illo architecto? Aliquam unde facilis officiis odio. Nobis a illum repudiandae quis sed.
                                                        Magni ratione incidunt aspernatur eligendi! Ipsum minus officiis repudiandae amet pariatur quibusdam eveniet commodi esse quod rem nostrum ad mollitia accusantium ipsam culpa, aliquid quas? Consequuntur quae eaque architecto voluptatem?
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