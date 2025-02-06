import { useContext, useState } from "react"
import "./Header.css"
import { GlobalContext } from "../../../../contexts/globalContext"

export default function Header(){

    const globalContext = useContext(GlobalContext)
    const [showDropdown, setShowDropdown] = useState(false)

    function onLogout(){
        globalContext.setUser(null)
    }

    return(
        <>
            <div className="header">
                <div>Real-time Chat App</div>
                {showDropdown && <div className="dropdown-background" onClick={() => setShowDropdown(false)}></div>}
                <div className="dropdown-parent" onClick={() => {setShowDropdown(true)}}>
                    {globalContext.user && <span>{globalContext.user.displayName}</span>}
                    {showDropdown && 
                    <ul className="dropdown-list">
                        <li>Profile</li>
                        <li onClick={onLogout}>Logout</li>
                    </ul>}
                </div>
            </div>
        </>
    )
}