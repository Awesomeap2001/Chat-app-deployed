import React, { useEffect, useRef, useState } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios';
import { host } from '../utils/API';
import { v4 as uuidv4 } from 'uuid'

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    const getMessages = async () => {
        const response = await axios.post(`${host}/api/messages/getallmessages`, {
            from: currentUser._id,
            to: currentChat._id
        })
        setMessages(response.data);
    }

    useEffect(() => {
        if (currentChat) {
            getMessages()
        }
    }, [currentChat])

    const handleSendMsg = async (message) => {
        await axios.post(`${host}/api/messages/addmessage`, {
            from: currentUser._id,
            to: currentChat._id,
            message: message
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: message
        })

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: message })
        setMessages(msgs)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...messages, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    return (
        <div className='grid h-full grid-rows-[auto_1fr_auto]'>
            <div className="chat-header bg-blue-500 px-6 py-3 flex items-center justify-between">
                <div className="user-details flex items-center justify-center">
                    <div className='w-12 h-12 rounded-full grid place-content-center bg-fuchsia-400'>
                        <p className='text-3xl font-bold pb-1 capitalize'>{currentChat.username[0]}</p>
                    </div>
                    <h3 className='text-2xl px-3 font-semibold capitalize'>{currentChat.username}</h3>
                </div>
                <Logout />
            </div>

            <div className="chat-messages">
                <div className='h-[65vh] overflow-y-auto flex flex-col gap-2 p-3' style={{ background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)" }}>
                    {
                        messages.map((message, index) => (
                            <div key={uuidv4()} ref={scrollRef}>
                                {console.log(message)}
                                <div className={`message px-4 py-3 w-fit max-w-3/5 bg-zinc-700 rounded-xl ${message.fromSelf && "ms-auto"}`}>
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default ChatContainer