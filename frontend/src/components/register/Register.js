import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { registerUser, setStatus } from "../../slices/RegisterSlice";


export default function Register() {

    const registerStatus= useSelector( state => state.register.success)
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [userData, setUserData]= useState({
        username: '',
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        password: '',
        phone: ''
    })

    const changeHandler= (e) => {
        setUserData({...userData , [e.target.name] : e.target.value})
    }

    const submitHandler= (e) => {
        e.preventDefault()
        dispatch(registerUser(userData))
        if(!setStatus){
            alert("Username or Email already exists")
        }
    }

    useEffect(() => {
        if(registerStatus){
            alert("Registration Successful")
            navigate('/login')
            dispatch(setStatus())
        }
    },[registerStatus])


    console.log(userData)
    return (
        <div>
        <Header></Header>    
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>   
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" value={userData.username} onChange={changeHandler} type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                        </div>
                        <div>
                            <label htmlFor="first-name" className="sr-only">First name</label>
                            <input id="firstname" name="first_name" value={userData.firstname} onChange={changeHandler}  type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First name" />
                        </div>
                        <div>
                            <label htmlFor="last-name" className="sr-only">Last name</label>
                            <input id="last name" name="last_name" value={userData.lastname} onChange={changeHandler}  type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last name" />
                        </div>
                        <div>
                            <label htmlFor="address" className="sr-only">Address</label>
                            <input id="address" name="address" value={userData.address} onChange={changeHandler}  type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Address" />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" value={userData.email} onChange={changeHandler}  type="email"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" value={userData.password} onChange={changeHandler}  type="password"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only">Phone number</label>
                            <input id="phone" name="phone"  value={userData.phone} onChange={changeHandler}  type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Phone number" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}
