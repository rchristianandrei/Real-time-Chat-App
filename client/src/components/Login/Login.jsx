import "./login.css"

export default function Login(){

    return(
        <>
            <div className="parent">
                <form className="login p-10 rounded-2xl" method="post">
                    <h1 className="text-5xl text-center mb-10">Login</h1>
                    <div className="form-control">
                        <label className="text-2xl" htmlFor="username">Username</label>
                        <input className="text-2xl" type="text" name="username" id="username" />
                    </div>

                    <div className="form-control">
                        <label className="text-2xl" htmlFor="password">Password</label>
                        <input className="text-2xl" type="password" name="password" id="password" />
                    </div>

                    <div className="buttons">
                        <button className="button sign-in">Sign in</button>
                        <button className="button register">Register</button>
                    </div>
                   
                </form>
            </div>
        </>
    )
}