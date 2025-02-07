import { Link, useNavigate } from "react-router-dom"
import style from "./login.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import { ServiceContext } from "../../services/serviceContext"
import { GlobalContext } from "../../contexts/globalContext"

export default function Login(){

    const navigate = useNavigate()
    
    const globalContext = useContext(GlobalContext)
    const authServices = useContext(ServiceContext).authService

    useEffect(() => {
        if(globalContext.user)
            navigate("/")
    },[])

    const usernameField = useRef(null)
    const passwordField = useRef(null)

    const [showError, setShowError] = useState(false)

    function onSubmit(event) {
        event.preventDefault()
        const username = usernameField.current.value
        const password = passwordField.current.value
        
        authServices.login(username, password)
        .then(res => res.json())
        .then(res=> {
            sessionStorage.setItem("user", JSON.stringify(res))
            globalContext.setUser(res)
            setShowError(false)
            navigate("/")
        })
        .catch(reason => {
            setShowError(true)
        })
    }

    return(<>
        <div className={style.parent}>
            <form className={style.container} method="post" onSubmit={onSubmit}>
                <h1 className={style.heading}>Login</h1>

                <div className={style.formControl}>
                    <label htmlFor="username">Username</label>
                    <input ref={usernameField} type="text" id="username" name="username"/>
                </div>

                <div className={style.formControl}>
                    <label htmlFor="password">Password</label>
                    <input ref={passwordField} type="password" id="password" name="password"/>
                </div>

                {showError && <p className={style.error}>
                    Please double check your credentials and try again later
                </p>}

                <div className={style.buttons}>
                    <button type="submit" className={`${style.button} ${style.primary}`}>Sign In</button>
                    <button className={`${style.button} ${style.secondary}`}><Link to="/register">Register</Link></button>
                </div>
            </form>
        </div>
    </>)
}