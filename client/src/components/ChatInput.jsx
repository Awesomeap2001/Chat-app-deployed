import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import SendIcon from '../assets/send.svg';

const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const handleEmojiClick = (emoji, event) => {
        setMsg(msg + emoji.emoji)
    }

    const sendChat = () => {
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("")
        }
    }

    return (
        <div className='chat-input flex px-3 py-2 items-center gap-3'>
            <div className="button-container">
                <div className="emoji text-3xl cursor-pointer relative">
                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                    <div className='absolute bottom-full mb-3'>
                        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                    </div>
                </div>
            </div>

            <div className='flex-1 flex items-center bg-zinc-600 rounded-2xl overflow-hidden'>
                <input type="text" placeholder='type your message here' value={msg} onChange={(e) => setMsg(e.target.value)} className='flex-1  px-6 py-2 bg-transparent outline-none' />
                <button className='bg-blue-500 hover:bg-blue-600 py-2 px-8' onClick={sendChat}>
                    <img src={SendIcon} alt="send" className='w-8' />
                </button>
            </div>
        </div>
    )
}

export default ChatInput