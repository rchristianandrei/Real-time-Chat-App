import ChatEntry from "../ChatEntry/ChatEntry"
import style from "./ChatList.module.css"

export default function ChatList(){

    return(
        <div className={style.parent}>
            <div className={style.entries}>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
                <ChatEntry></ChatEntry>
            </div>
        </div>
    )
}