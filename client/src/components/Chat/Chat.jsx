import { useContext, useEffect } from "react"
import "./Chat.css"
import Header from "./components/Header/Header"
import { GlobalContext } from "../../contexts/globalContext"
import { useNavigate } from "react-router-dom"

export default function Chat(){

    const navigate = useNavigate()

    const globalContext = useContext(GlobalContext)

    useEffect(() => {
        if (!globalContext.user) navigate("/login")
    }, [globalContext.user])

    return(
        <>
            <div className="parent parent-md">
                <Header></Header>
                <div className="chat-side-bar chat-side-bar-md">
                    
                </div>
                <div>
                    Actual chat
                </div>
            </div>
        </>
    )
}