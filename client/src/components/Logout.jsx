import React from 'react'
import logoutIcon from '../assets/logout.svg';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <button onClick={handleLogout} className='p-2 hover:bg-blue-600 rounded-xl'>
            <img src={logoutIcon} alt="" className='w-8' />
        </button>
    )
}

export default Logout