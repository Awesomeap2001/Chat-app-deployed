import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../utils/API';


const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
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
        const { email, password } = user;
        if (password === "") {
            toast.error("Email and Password are required", toastOptions)
            return false
        }
        else if (email === "") {
            toast.error("Email and Password are required", toastOptions)
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
            const { email, password } = user;
            const { data } = await axios.post(`${host}/api/auth/login`, { email, password })
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

                <input type="email" placeholder='Email' name='email' value={user.email} onChange={e => handleChange(e)} className='bg-zinc-600 text-lg px-3 py-2 rounded-lg outline-none' required />
                <input type="password" placeholder='Password' name='password' value={user.password} onChange={e => handleChange(e)} className='bg-zinc-600 text-lg px-3 py-2 rounded-lg outline-none' required />

                <button type='submit' className='bg-blue-600 text-xl px-3 py-2 rounded-lg outline-none uppercase'>Login</button>

                <p className='text-zinc-300 text-center'>Don't have an Account? <Link to={'/register'} className='text-blue-500 font-semibold hover:underline underline-offset-2'>Register</Link></p>
            </form>


        </div>
    )
}

export default Login;