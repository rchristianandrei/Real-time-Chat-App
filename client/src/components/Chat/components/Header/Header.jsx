import { useContext, useState } from "react"

import style from "./Header.module.css"
import { GlobalContext } from "../../../../contexts/globalContext"

export default function Header(){

    const globalContext = useContext(GlobalContext)
    const [showDropdown, setShowDropdown] = useState(false)

    function onLogout(){
        globalContext.setUser(null)
        sessionStorage.removeItem("user")
    }

    return(
        <>
            <div className={style.header}>
                <div>Real-time Chat App</div>
                {showDropdown && <div className={style.dropdownBackground} onClick={() => setShowDropdown(false)}></div>}
                <div className={style.dropdownParent} onClick={() => {setShowDropdown(true)}}>
                    {globalContext.user && <span>{globalContext.user.displayName}</span>}
                    {showDropdown && 
                    <ul className={style.dropdownList}>
                        <li>Profile</li>
                        <li onClick={onLogout}>Logout</li>
                    </ul>}
                </div>
            </div>
        </>
    )
}