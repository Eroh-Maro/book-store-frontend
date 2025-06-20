import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from "axios"
import getBaseUrl from '../utils/baseURL';



const d = new Date();
let year = d.getFullYear();

const AdminLogin = () => {
       const [message, setMessage] = useState("")
        const navigate = useNavigate()

        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm()

          const onSubmit  = async (data) => {
            console.log(data);
            try {
                const  response = await axios.post(`${getBaseUrl()}/api/auth/admin`, 
                    data, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const auth =  response.data;
                    console.log(auth);
               if(auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has expired, Please login again');
                    navigate("/")
                }, 3600 * 1000)
               }     
               alert("Admin Login Successful!")
               navigate("/dashboard")
            } catch (error) {
                setMessage("Please provide a valid username and password") 
               console.error(error)
            }
          }

  return (
    <div className='h-screen flex justify-center items-center'>
    <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h1 text-xl font-semibold mb-4>Admin Dashboard Login </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">
                    Username
                </label>
                <input 
                {...register("username", { required: true })} 
                type="username" name='username' id='username' placeholder='username' 
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight 
                focus:outline-none focus:shadow'/>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
                    Password
                </label>
                <input 
                {...register("password", { required:
                     true })} 
                type="password" name='password' id='password' placeholder='Password' 
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight 
                focus:outline-none focus:shadow'/>
            </div>
            {
                message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
            }
            <div>
                <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline'>Login</button>
            </div>
        </form>        
           
          <p className='mt-5 text-center text-grey-500n text-xs'>©{year} Book Store. All rights reserved.</p>
    </div>
</div>
  )
}

export default AdminLogin


