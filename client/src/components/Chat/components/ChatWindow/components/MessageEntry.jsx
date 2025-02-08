import style from "./MessageEntry.module.css"

export default function MessageEntry(props){

    return(
        <div className={style.parent}>
            <div className={`${style.sender} ${props.message.you ? style.alignLeft : null}`}><strong>{props.message.you ? "You": props.message.sender}</strong></div>
            <div className={style.messageBox}>
                <p className={`${style.message} ${props.message.you ? style.alignLeft : null}`}>{props.message.content}
                </p>
                {/* <p className={style.message}>LoremipsumLoremipsumLoremipsumLoremipsum LoremipsumLoremipsumLoremipsumLoremipsumLoremipsu mLoremipsumLoremipsumLoremipsumLoremipsumLoremips umLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum
                </p> */}
            </div>
        </div>
    )
}