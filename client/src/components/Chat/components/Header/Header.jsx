import { useState } from "react"
import "./Header.css"

export default function Header(){

    const [showDropdown, setShowDropdown] = useState(false)

    return(
        <>
            <div className="header">
                <div>Real-time Chat App</div>
                {showDropdown && <div className="dropdown-background" onClick={() => setShowDropdown(false)}></div>}
                <div className="dropdown-parent" onClick={() => {setShowDropdown(true)}}>
                    <span>Username</span>
                    {showDropdown && 
                    <ul className="dropdown-list">
                        <li>Profile</li>
                        <li>Logout</li>
                    </ul>}
                </div>
            </div>
        </>
    )
}