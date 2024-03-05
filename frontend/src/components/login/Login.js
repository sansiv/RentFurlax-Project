import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser } from "../../slices/AuthSlice";
import Header from "../header/Header";


export default function Login() {
    const [loginAttempt, setLoginAttempt] = useState(false) // To verify if the user attempted to login
    const isLoggedIn= useSelector(state => state.auth.user)
    const [userData, setUserData]= useState({
        username: '',
        password: ''
    })
    
    const dispatch= useDispatch()
    
    const changeHandler= (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const submitHandler= (e) => {
        e.preventDefault()
        setLoginAttempt(true)
        dispatch(loginUser(userData))
    }

    // useEffect(() => {
    //     if (loginAttempt && !isLoggedIn) {
    //         alert('Invalid username or password.');
    //     }
    // }, [isLoggedIn, loginAttempt]);

    return (
        <div>
        <Header></Header>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="username" name="username" type="text" value={userData.username} onChange={changeHandler} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" value={userData.password} onChange={changeHandler} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}
