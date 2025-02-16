import { useContext, useEffect, useRef, useState } from "react"

import style from "./ChatWindow.module.css"

import MessageEntry from "./components/MessageEntry"

import { getAllMessages, getChatByRecipient, sendMessage } from "../../../../services/chatService"
import { subscribeToMessage, unsubscribeToMessage } from "../../../../services/wsServices"

import { ChatContext } from "../../../../contexts/chatContext"

export default function ChatWindow(props){

    const chatContext = useContext(ChatContext)

    const [chat, setChat] = useState(null)

    const messageBox = useRef(null)

    function delegate(data){
        if(data.type !== "chat") return

        loadSelectedChat()
    }

    useEffect(() => {
        subscribeToMessage(delegate)
        loadSelectedChat()

        return () => {
            unsubscribeToMessage(delegate)
        }
    }, [chatContext.selectedChat])

    function loadSelectedChat(){
        if(!chatContext.selectedChat) return

        if(chatContext.selectedChat.id){
            getAllMessages(chatContext.selectedChat.id)
            .then(res => res.json())
            .then(res => setChat(res))
        }
        else if(chatContext.selectedChat.recepientId){
            getChatByRecipient(chatContext.selectedChat.recepientId)
            .then(res => res.json())
            .then(res => setChat(res))
        }
    }

    function onSendMessage(){
        if(!chatContext.selectedChat) return

        const content = messageBox.current.value
        
        if(!content) return
        
        sendMessage(chatContext.selectedChat.id, chatContext.selectedChat.recepientId, content)
        .then(res => messageBox.current.value = "")
        .catch(reason => console.log(reason))
    }

    function onKeyDown(e){
        if(e.key !== "Enter") return
        onSendMessage()
    }

    function back(){
        chatContext.setSelectedChat(null)
    }

    return(
    <div className={style.parent}>
        <div className={style.header}>
            {props.isMobileView && <button className={style.backButton} onClick={back}>Back</button>}
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