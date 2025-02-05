import { Link } from "react-router-dom"
import style from "./Register.module.css"

export default function Register(){

    function onSubmit(event) {
        event.preventDefault()

        // Validate
        const username = event.target.username.value
        const displayName = event.target.displayName.value
        const password = event.target.password.value
        const confirmPassword = event.target.confirmPassword.value

        let valid = true

        if(!username){
            console.error("Username cannot be empty")
            valid = false
        }

        if(!displayName){
            console.error("Username cannot be empty")
            valid = false
        }

        if(!password){
            console.log("Password cannot be empty")
            valid = false
        }
        else if(password !== confirmPassword){
            console.error("Passwords do not match")
            valid = false
        }

        if(!valid) return

        const user = {
            username: username,
            displayName: displayName,
            password: password
        }

        fetch("http://localhost:3000/api/auth/register", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
        .then(res =>console.log(res))
        .catch(reason => console.log(reason))
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
                    <label htmlFor="displayName">Display Name</label>
                    <input type="text" id="displayName" name="displayName"/>
                </div>

                <div className={style.formControl}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </div>

                <div className={style.formControl}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword"/>
                </div>

                <div className={style.buttons}>
                    <button className={`${style.button} ${style.primary}`}>Sign Up</button>
                    <Link to="/login"><button className={`${style.button} ${style.secondary}`}>Login</button></Link>
                </div>
            </form>
        </div>
    </>)
}