import React, { useState } from 'react'
import { BsMortarboardFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
    const navigate = useNavigate()
     // for login data
    const [SignUpData, SetSignUpData] = useState({
        username: '',
        email: '',
        password: ''
    })

    // send data to backend using axios
    const headleSubmit = async (e) => {
        e.preventDefault();

        // signup to system

        try{
            const res = await axios.post('http://localhost:8081/auth/SignUp', SignUpData)
            .then(res => {
                if(res.data.Status === "Success"){
                    alert("Registation Successfull")
                    navigate('/')
                }
                else{
                    alert(res.data.Error)
                }
            })
        }
        catch(err) {
            console.log(err)
        }

    }
  return (
    <div className='bg-gray-200 min-h-screen py-24 px-8'>
        <div className="md:grid grid-cols-3 gap-2">
            <div className=""></div>
            <div className="">
                <div className="bg-white py-16 px-8 rounded shadow-md w-full ">
                    <center className='text-gray-500'>
                        {/* change the Icon According to your needs */}
                        <h1 className=''><BsMortarboardFill className='h-20 w-auto'/></h1>
                        <p className="pt-4 text-2xl">Welcome to</p>
                        <p className="">Your Project Name</p>
                    </center>
                    <hr className='my-2'/>
                    <div className="my-4">
                        <form onSubmit={headleSubmit}>
                             <div className="my-2 md:mx-8">
                                <label htmlFor="" className=''>Username : </label>
                                <input type="text" name="" id="" className="w-full h-12 pl-2 rounded bg-gray-200" required placeholder='Enter Username'
                                onChange={e => SetSignUpData({...SignUpData, username:e.target.value})}/>
                            </div>
                            <div className="my-2 md:mx-8">
                                <label htmlFor="" className=''>Email : </label>
                                <input type="email" name="" id="" className="w-full h-12 pl-2 rounded bg-gray-200" required placeholder='Enter Email Address'
                                onChange={e => SetSignUpData({...SignUpData, email:e.target.value})}/>
                            </div>
                            <div className="my-2 md:mx-8">
                                <label htmlFor="" className=''>Password : </label>
                                <input type="password" name="" id="" className="w-full h-12 pl-2 rounded bg-gray-200" required placeholder='Enter Password' 
                                onChange={e => SetSignUpData({...SignUpData, password:e.target.value})}/>
                            </div>
                            <div className="my-2 md:mx-8">
                                <button type='submit' className='mt-8 font-semibold w-full py-4 px-8 rounded bg-blue-500 text-white shadow-md duration-500 hover:bg-blue-600'>Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <hr className='my-2'/>
                    <p className="my-4">Already have an Account ? <Link to={'/'}><span className="text-blue-500">SignUp</span></Link></p>
                </div>  
            </div>
            <div className=""></div>
        </div>
    </div>
  )
}

export default SignUp