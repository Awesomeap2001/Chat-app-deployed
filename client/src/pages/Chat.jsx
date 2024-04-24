import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { host } from '../utils/API';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

const Chat = () => {
    const socket = useRef()
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)

    useEffect(() => {
        if (!localStorage.getItem("Chat-app-user")) {
            navigate("/login")
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("Chat-app-user")))
        }
    }, [])

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])


    const getAllUsers = async () => {
        if (currentUser) {
            const { data } = await axios.get(`${host}/api/auth/allusers/${currentUser._id}`)
            setContacts(data)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return (
        <div className='h-screen grid grid-rows-[auto_1fr]'>
            <h1 className='text-5xl font-bold text-center w-fit mx-auto py-2 tracking-tighter bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text'>Real Time Chat App</h1>
            {currentUser && (
                <div className='grid grid-cols-[25%_1fr] gap-4 p-4 h-full'>
                    <div className="left bg-zinc-700 rounded-lg overflow-auto">
                        <Contacts
                            contacts={contacts}
                            currentUser={currentUser}
                            changeChat={handleChatChange}
                        />
                    </div>
                    <div className="right bg-zinc-700 rounded-lg overflow-hidden">
                        {
                            currentChat === null ?
                                <Welcome currentUser={currentUser} /> :
                                <ChatContainer
                                    currentChat={currentChat}
                                    currentUser={currentUser}
                                    socket={socket}
                                />
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chat