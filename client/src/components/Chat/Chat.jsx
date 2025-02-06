import "./Chat.css"
import Header from "./components/Header/Header"

export default function Chat(props){

    return(
        <>
            <div className="parent parent-md">
                <Header user={props.user}></Header>
                <div className="chat-side-bar chat-side-bar-md">
                    
                </div>
                <div>
                    Actual chat
                </div>
            </div>
        </>
    )
}