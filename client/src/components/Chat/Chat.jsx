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
    const [isMobileView, setIsMobileView] = useState(false)

    useEffect(() => {
        function resizeDelegate(){
            setIsMobileView(window.innerWidth <= 768)
        }
        resizeDelegate()
        window.addEventListener("resize", resizeDelegate)
        return () => {
            window.removeEventListener("resize", resizeDelegate)
        }
    }, [])

    useEffect(() => {
        if (!globalContext.user) navigate("/login")
    }, [globalContext.user])

    return(
        <ChatContext.Provider value={{selectedChat, setSelectedChat}}>
            <div className={`${style.parent} ${style.parentMd}`}>
                <div className={style.header}><Header></Header></div>
                <div className={style.chat}>
                    {!(isMobileView && selectedChat) &&<div className={`${style.chatSideBar} ${isMobileView && style.flex1}`}>
                        <SideBar></SideBar>
                    </div>}
                    {(!isMobileView || selectedChat) && <div className={isMobileView ? style.mobileChatWindow : style.flex1}>
                        <ChatWindow isMobileView={isMobileView}></ChatWindow>
                    </div>}
                </div>
            </div>
        </ChatContext.Provider>
    )
}