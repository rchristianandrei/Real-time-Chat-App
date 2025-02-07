import { useContext, useEffect, useRef, useState } from "react"

import style from "./ChatWindow.module.css"

import { ChatContext } from "../../../../contexts/chatContext"
import MessageEntry from "./components/MessageEntry"
import { ServiceContext } from "../../../../services/serviceContext"

export default function ChatWindow(){

    const chatService = useContext(ServiceContext).chatService
    const chatContext = useContext(ChatContext)

    const [messages, setMessages] = useState([])

    const messageBox = useRef(null)

    useEffect(() => {
        if(!chatContext.selectedChat) return
        chatService.getAllMessages(chatContext.selectedChat)
        .then(res => res.json())
        .then(res => setMessages(res.messages))
    }, [chatContext.selectedChat])

    function onSendMessage(){
        if(!chatContext.selectedChat) return

        const content = messageBox.current.value
        
        if(!content) return

        chatService.sendMessage(chatContext.selectedChat, null, content)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(reason => console.log(reason))
    }

    return(
    <div className={style.parent}>
        <div className={style.chatAreaParent}>
            <div className={style.chatArea}>
                {messages.map((v, i) => <MessageEntry key={i} message={v}></MessageEntry>)}
            </div>
        </div>
        <div className={style.chatBar}>
            <input className={style.messageInput} type="text" placeholder="type..." ref={messageBox}/>
            <button onClick={onSendMessage} className={style.sendButton}>Send</button>
        </div>
    </div>
    )
}