import { useState } from "react"
import style from "./SideBar.module.css"
import ChatList from "../ChatList/ChatList"
import SearchResult from "../SearchResult/SearchResult"

export default function SideBar(){

    const [showSearch, setShowResult] = useState(false)

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
            : <ChatList></ChatList>}
        </div>
    </>            
    )
}