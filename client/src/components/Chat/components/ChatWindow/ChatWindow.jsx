import { useContext, useEffect, useState } from "react"

import style from "./ChatWindow.module.css"

import { ChatContext } from "../../../../contexts/chatContext"
import MessageEntry from "./components/MessageEntry"
import { ServiceContext } from "../../../../services/serviceContext"

export default function ChatWindow(){

    const chatService = useContext(ServiceContext).chatService
    const chatContext = useContext(ChatContext)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        if(!chatContext.selectedChat) return
        chatService.getAllMessages(chatContext.selectedChat)
        .then(res => res.json())
        .then(res => setMessages(res.messages))
    }, [chatContext.selectedChat])

    return(
    <div className={style.parent}>
        <div className={style.chatAreaParent}>
            <div className={style.chatArea}>
                {messages.map((v, i) => <MessageEntry key={i} message={v}></MessageEntry>)}
            </div>
        </div>
        <div className={style.chatBar}>
            <input className={style.messageInput} type="text" placeholder="type..."/>
            <button className={style.sendButton}>Send</button>
        </div>
    </div>
    )
}