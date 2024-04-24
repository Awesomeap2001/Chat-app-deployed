import React, { useEffect, useState } from 'react'

const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400'];

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentSelected, setCurrentSelected] = useState(null)
    const [currentUserName, setCurrentUserName] = useState(null)

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }

    return (
        <>
            {currentUserName && (
                <>
                    <div className="current-user">
                        <div className={`contact bg-blue-500 px-3 py-3 flex items-center justify-center`}>
                            <div className='w-12 h-12 rounded-full grid place-content-center bg-orange-400'>
                                <p className='text-3xl font-bold pb-1 capitalize'>{currentUserName[0]}</p>
                            </div>
                            <h3 className='text-2xl px-3 font-semibold capitalize'>{currentUserName}</h3>
                        </div>
                    </div>
                    <div className='contacts p-2 overflow-y-auto h-[75vh]'>
                        {contacts.map((contact, index) => (
                            <div className={`contact hover:bg-zinc-600 rounded-lg cursor-pointer px-3 py-2 flex items-center gap-3 ${currentSelected === index ? "bg-zinc-600" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                <div className={`w-12 h-12 rounded-full grid place-content-center ${colors[index % colors.length]}`}>
                                    <p className='text-3xl font-bold pb-1 capitalize'>{contact.username[0]}</p>
                                </div>
                                <h3 className='text-xl font-semibold capitalize'>{contact.username}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default Contacts