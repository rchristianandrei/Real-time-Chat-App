import { useContext } from "react"

import style from "./ChatWindow.module.css"

import { ChatContext } from "../../../../contexts/chatContext"

export default function ChatWindow(){

    const chatContext = useContext(ChatContext)

    return(
    <div className={style.parent}>
        <div className={style.chatArea}>
            {chatContext.selectedChat}
        </div>
        <div className={style.chatBar}>
            <input className={style.messageInput} type="text" placeholder="type..."/>
            <button className={style.sendButton}>Send</button>
        </div>
    </div>
    )
}