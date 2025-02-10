import { useContext, useEffect, useRef, useState } from "react"

import style from "./ChatWindow.module.css"

import { ChatContext } from "../../../../contexts/chatContext"
import MessageEntry from "./components/MessageEntry"
import { ServiceContext } from "../../../../services/serviceContext"
import { WebSocketContext } from "../../../../contexts/webSocketContext"

export default function ChatWindow(){

    const wsContext = useContext(WebSocketContext)
    const chatService = useContext(ServiceContext).chatService
    const chatContext = useContext(ChatContext)

    const [chat, setChat] = useState(null)

    const messageBox = useRef(null)

    useEffect(() => {
        return () => {
            if(!wsContext.get().find(v =>  v === delegate)) return
            wsContext.remove(delegate)
        }
    }, [])

    function delegate(data){
        if(data.type !== "chat") return

        loadSelectedChat()
    }

    useEffect(() => {
        if(wsContext.get().find(v =>  v === delegate)) return
        wsContext.add(delegate)

        loadSelectedChat()
    }, [chatContext.selectedChat])

    function loadSelectedChat(){
        if(!chatContext.selectedChat) return
        chatService.getAllMessages(chatContext.selectedChat.id)
        .then(res => res.json())
        .then(res => setChat(res))
    }

    function onSendMessage(){
        if(!chatContext.selectedChat) return

        const content = messageBox.current.value
        
        if(!content) return

        chatService.sendMessage(chatContext.selectedChat.id, null, content)
        .then(res => messageBox.current.value = "")
        .catch(reason => console.log(reason))
    }

    function onKeyDown(e){
        if(e.key !== "Enter") return
        onSendMessage()
    }

    return(
    <div className={style.parent}>
        <div className={style.header}>
            <button className={style.backButton}>Back</button>
            <strong>{chat && chat.name}</strong>
        </div>
        <div className={style.chatAreaParent}>
            <div className={style.chatArea}>
                {chat && chat.messages.map((v, i) => <MessageEntry key={i} message={v}></MessageEntry>)}
            </div>
        </div>
        <div className={style.chatBar}>
            <input onKeyDown={onKeyDown} className={style.messageInput} type="text" placeholder="type..." ref={messageBox}/>
            <button onClick={onSendMessage} className={style.sendButton}>Send</button>
        </div>
    </div>
    )
}