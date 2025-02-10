import { useContext } from "react"

import style from "./ChatList.module.css"
import ChatEntry from "../ChatEntry/ChatEntry"

import {ChatContext} from "../../../../contexts/chatContext.js"

export default function ChatList(props){

    const chatContext = useContext(ChatContext)

    function OnChatClick(index){
        const chat =props.chats[index]
        chatContext.setSelectedChat({id: chat.id})
    }

    return(
        <div className={style.parent}>
            <div className={style.entries}>
                {props.chats.map((v, i) => (<ChatEntry onClick={() => {OnChatClick(i)}} key={i} chat={v}></ChatEntry>))}
            </div>
        </div>
    )
}