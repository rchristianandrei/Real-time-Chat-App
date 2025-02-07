import style from "./ChatEntry.module.css"

export default function ChatEntry(props){

    return(
        <div onClick={props.onClick} className={style.chatEntry}>
            <div className={style.chatName}>{props.chat.displayName}</div>
            <div className={style.message}>{props.chat.message && `${props.chat.sender}: ${props.chat.message}`}</div>
        </div>
    )
}