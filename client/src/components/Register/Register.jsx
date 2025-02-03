import { Link } from "react-router-dom"
import style from "./Register.module.css"

export default function Register(){

    function onSubmit(event) {
        event.preventDefault()
        console.log("Submit")
    }

    return(<>
        <div className={style.parent}>
            <form className={style.container} method="post" onSubmit={onSubmit}>
                <h1 className={style.heading}>Register</h1>

                <div className={style.formControl}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username"/>
                </div>

                <div className={style.formControl}>
                    <label htmlFor="password1">Password</label>
                    <input type="password" id="password1" name="password1"/>
                </div>

                <div className={style.formControl}>
                    <label htmlFor="password2">Password Again</label>
                    <input type="password" id="password2" name="password2"/>
                </div>

                <div className={style.buttons}>
                    <button className={`${style.button} ${style.primary}`}>Sign Up</button>
                    <Link to="/login"><button className={`${style.button} ${style.secondary}`}>Login</button></Link>
                </div>
            </form>
        </div>
    </>)
}