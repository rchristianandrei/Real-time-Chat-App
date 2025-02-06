import { useContext, useEffect } from "react"

import style from "./Chat.module.css"
import Header from "./components/Header/Header"
import { GlobalContext } from "../../contexts/globalContext"
import { useNavigate } from "react-router-dom"
import SideBar from "./components/SideBar/SideBar"

export default function Chat(){

    const navigate = useNavigate()

    const globalContext = useContext(GlobalContext)

    useEffect(() => {
        if (!globalContext.user) navigate("/login")
    }, [globalContext.user])

    return(
        <>
            <div className={`${style.parent} ${style.parentMd}`}>
                <Header></Header>
                <div className={`${style.chatSideBar} ${style.chatSideBarMd}`}>
                    <SideBar></SideBar>
                </div>
                <div>
                    Actual chat
                </div>
            </div>
        </>
    )
}