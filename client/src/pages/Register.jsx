import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../utils/API';


const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const navigate = useNavigate()

    const toastOptions = {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        theme: "dark"
    }

    useEffect(() => {
        if (localStorage.getItem("Chat-app-user")) {
            navigate("/")
        }
    }, [])

    const handleValidation = () => {
        const { username, email, password, confirmpassword } = user;
        if (password !== confirmpassword) {
            toast.error("Password and Confirm password should be same.", toastOptions)
            return false;
        }
        else if (password.length < 4 && password.length > 20) {
            toast.error("Password should be between 4 to 20 characters", toastOptions)
            return false
        }
        else if (email === "") {
            toast.error("Email is required", toastOptions)
            return false
        }
        return true;
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = user;
            const { data } = await axios.post(`${host}/api/auth/register`, { username, email, password })
            // console.log(data)
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            else {
                localStorage.setItem("Chat-app-user", JSON.stringify(data.user))
                navigate("/")
            }
        }
    }
    return (
        <div className='register h-screen grid place-content-center'>
            <form onSubmit={(e) => handleSubmit(e)} className='bg-zinc-700 p-12 rounded-xl shadow-lg grid gap-4 w-[450px]'>
                <h1 className='text-4xl font-semibold tracking-tight text-center mb-4'>REAL TIME CHAT APP</h1>

                <input type="text" placeholder='Username' name='username' value={user.username} onChange={e => handleChange(e)} className='bg-zinc-600 text-lg px-3 py-2 rounded-lg outline-none' required />
                <input type="email" placeholder='Email' name='email' value={user.email} onChange={e => handleChange(e)} className='bg-zinc-600 text-lg px-3 py-2 rounded-lg outline-none' required />
                <input type="password" placeholder='Password' name='password' value={user.password} onChange={e => handleChange(e)} className='bg-zinc-600 text-lg px-3 py-2 rounded-lg outline-none' required />
                <input type="password" placeholder='Confirm Password' name='confirmpassword' value={user.confirmpassword} onChange={e => handleChange(e)} className='bg-zinc-600 text-lg px-3 py-2 rounded-lg outline-none' required />

                <button type='submit' className='bg-blue-600 text-xl px-3 py-2 rounded-lg outline-none uppercase'>Create User</button>

                <p className='text-zinc-300 text-center'>Already have an Account? <Link to={'/login'} className='text-blue-500 font-semibold hover:underline underline-offset-2'>Login Here</Link></p>
            </form>


        </div>
    )
}

export default Register