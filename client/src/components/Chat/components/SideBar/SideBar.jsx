import { useContext, useEffect, useState } from "react"
import style from "./SideBar.module.css"
import ChatList from "../ChatList/ChatList"
import SearchResult from "../SearchResult/SearchResult"
import { ServiceContext } from "../../../../services/serviceContext"
import { GlobalContext } from "../../../../contexts/globalContext"
import { WebSocketContext } from "../../../../contexts/webSocketContext"

export default function SideBar(){

    const globalContext = useContext(GlobalContext)
    const wsContext = useContext(WebSocketContext)
    const services = useContext(ServiceContext).chatService
    
    const [showSearch, setShowResult] = useState(false)
    const [chats, setChats] = useState([])

    // Sub to websocket message
    useEffect(() => {
        if(wsContext.get().find(v =>  v === delegate)) return
        wsContext.add(delegate)

        return () => {
            wsContext.remove(delegate)
        }
    }, [])

    function delegate(data){
        if(data.type !== "chat") return
        
        services.getAllChat()
        .then(res => res.json())
        .then(res => {
            setChats(res)
        })
        .catch(reason => console.log(reason))
    }

    useEffect(() => {
        if(!globalContext.user) return

        services.getAllChat()
        .then(res => res.json())
        .then(res => {
            setChats(res)
        })
        .catch(reason => console.log(reason))
    }, [globalContext.user])

    function onSearchChange(e){
       setShowResult(String(e.target.value).length > 0)
    }

    return(
    <>
        <div className={style.parent}>
            <div className={style.searchBar}>
                <input onChange={onSearchChange} className={style.searchField} type="text" placeholder="Search people..." />
                <button className={style.searchButton}>Find</button>
            </div>

            {showSearch 
            ? <SearchResult></SearchResult> 
            : <ChatList chats={chats}></ChatList>}
        </div>
    </>            
    )
}