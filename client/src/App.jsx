import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className='text-white'>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Chat />} />
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
