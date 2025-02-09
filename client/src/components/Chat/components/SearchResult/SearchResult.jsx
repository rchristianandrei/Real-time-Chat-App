import { useContext, useEffect, useState } from "react"

import ChatEntry from "../ChatEntry/ChatEntry"

import { ChatContext } from "../../../../contexts/chatContext"
import { findUsers } from "../../../../services/userService"

export default function SearchResult(props){

    const chatContext = useContext(ChatContext)

    const [users, setUsers] = useState([])

    useEffect(() => {
        findUsers(props.search.search)
        .then(res => res.json())
        .then(res => setUsers(res))
    }, [props.search])

    function onClick(id){
        props.search.setSearch(null)
        props.searchBox.current.value = null
        chatContext.setSelectedChat({recepientId: id})
    }

    return(
        <div>
            <h2>People</h2>
        {users.map((v, i) => <ChatEntry key={i} chat={v} onClick={() => onClick(v.id)}></ChatEntry>)}
        </div>
    )
}