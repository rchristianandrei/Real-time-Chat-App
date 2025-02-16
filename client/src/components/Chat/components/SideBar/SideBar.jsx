import { useContext, useEffect, useRef, useState } from "react"
import style from "./SideBar.module.css"
import ChatList from "../ChatList/ChatList"
import SearchResult from "../SearchResult/SearchResult"

import { getAllChat } from "../../../../services/chatService"
import { subscribeToMessage, unsubscribeToMessage } from "../../../../services/wsServices"

import { GlobalContext } from "../../../../contexts/globalContext"

export default function SideBar(){

    const globalContext = useContext(GlobalContext)

    const searchBox = useRef(null)
    
    const [search, setSearch] = useState(null)
    const [chats, setChats] = useState([])

    // Sub to websocket message
    useEffect(() => {
        function delegate(data){
            if(data.type !== "chat") return
            getChat()
        }

        subscribeToMessage(delegate)

        return () => {
            unsubscribeToMessage(delegate)
        }
    }, [])

    useEffect(() => {
        if(!globalContext.user) return

        getChat()
    }, [globalContext.user])

    function getChat(){
        getAllChat()
        .then(res => res.json())
        .then(res => {
            setChats(res)
        })
        .catch(reason => console.log(reason))
    }

    function onSearchChange(e){
       setSearch(e.target.value.toString())
    }

    return(
    <>
        <div className={style.parent}>
            <div className={style.searchBar}>
                <input ref={searchBox} onChange={onSearchChange} className={style.searchField} type="text" placeholder="Search people..." />
                <button className={style.searchButton}>Find</button>
            </div>

            {search 
            ? <SearchResult search={{search, setSearch}} searchBox={searchBox}></SearchResult> 
            : <ChatList chats={chats}></ChatList>}
        </div>
    </>            
    )
}