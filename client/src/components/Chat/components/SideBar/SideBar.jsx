import { useContext, useEffect, useState } from "react"
import style from "./SideBar.module.css"
import ChatList from "../ChatList/ChatList"
import SearchResult from "../SearchResult/SearchResult"
import { ServiceContext } from "../../../../services/serviceContext"

export default function SideBar(){

    const services = useContext(ServiceContext).chatService
    
    const [showSearch, setShowResult] = useState(false)
    const [chats, setChats] = useState([])

    useEffect(() => {
        services.getAllChat()
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setChats(res)
        })
        .catch(reason => console.log(reason))
    }, [])

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