import { useContext, useState } from "react"

import style from "./Header.module.css"
import { GlobalContext } from "../../../../contexts/globalContext"
import { removeUser } from "../../../../services/sessionStorageServices"

export default function Header(){

    const globalContext = useContext(GlobalContext)
    const [showDropdown, setShowDropdown] = useState(false)

    function onLogout(){
        globalContext.setUser(null)
        removeUser()
    }

    return(
        <>
            <div className={style.header}>
                <div>Real-time Chat App</div>
                <div className={style.dropdownParent} onClick={() => {setShowDropdown(true)}}>
                    {globalContext.user && <span>{globalContext.user.displayName}</span>}
                </div>

                {showDropdown && 
                <div className={style.dropdownBackground} onClick={() => setShowDropdown(false)}>
                    <ul className={style.dropdownList}>
                        <li>Profile</li>
                        <li onClick={onLogout}>Logout</li>
                    </ul>
                </div>}
            </div>
        </>
    )
}