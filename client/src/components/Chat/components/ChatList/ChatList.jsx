import { useContext } from "react"

import {GlobalContext} from "../../../../contexts/globalContext.js"
import ChatEntry from "../ChatEntry/ChatEntry"
import style from "./ChatList.module.css"

export default function ChatList(props){

    const globalContext = useContext(GlobalContext)

    return(
        <div className={style.parent}>
            <div className={style.entries}>
                {props.chats.map((v, i) => (<ChatEntry key={i}></ChatEntry>))}
            </div>
        </div>
    )
}