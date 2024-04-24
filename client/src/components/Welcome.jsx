import React from 'react'

const Welcome = ({ currentUser }) => {
    return (
        <div className='grid place-content-center h-full text-center'>
            <p className='text-[15vw]'>👋</p>
            <h1 className='text-3xl'>Welcome, <span className='font-semibold text-[#5092FF]'>{currentUser.username}!</span></h1>
            <h3 className='text-xl'>Please select a chat start messaging.</h3>
        </div>
    )
}

export default Welcome