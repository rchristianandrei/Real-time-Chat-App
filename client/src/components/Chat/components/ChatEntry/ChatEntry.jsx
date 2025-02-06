import style from "./ChatEntry.module.css"

export default function ChatEntry(){

    return(
        <div className={style.chatEntry}>
            <div className={style.chatName}>DisplayName</div>
            <div>Last message</div>
        </div>
    )
}