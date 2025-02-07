import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import style from "./Chat.module.css"

import { GlobalContext } from "../../contexts/globalContext.js"
import { ChatContext } from "../../contexts/chatContext.js"

import Header from "./components/Header/Header"
import SideBar from "./components/SideBar/SideBar"
import ChatWindow from "./components/ChatWindow/ChatWindow.jsx"

export default function Chat(){

    const navigate = useNavigate()

    const globalContext = useContext(GlobalContext)

    const [selectedChat, setSelectedChat] = useState(null)

    useEffect(() => {
        if (!globalContext.user) navigate("/login")
    }, [globalContext.user])

    return(
        <ChatContext.Provider value={{selectedChat, setSelectedChat}}>
            <div className={`${style.parent} ${style.parentMd}`}>
                <Header></Header>
                <div className={`${style.chatSideBar} ${style.chatSideBarMd}`}>
                    <SideBar></SideBar>
                </div>
                <div>
                    <ChatWindow></ChatWindow>
                </div>
            </div>
        </ChatContext.Provider>
    )
}