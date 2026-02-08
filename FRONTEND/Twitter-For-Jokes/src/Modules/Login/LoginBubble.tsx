import React, {useState} from "react";

function LoginBubble() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccesfull, setLoginSuccesfull] = useState("");
    const [errorNotification, setErrorNotification] = useState(false);
    const [confirm, showConfirm] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorNotification(false);
        showConfirm(false)
        setLoginSuccesfull("");

        const user = {
            username: userName,
            password: password,
        }

        fetch("http://localhost:65451/api/Authentication", {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user),
            credentials: "include",
        }).then(response => {
            if (response.ok) {
                console.log(response);

                setUsername("")
                setPassword("")
                showConfirm(true);
                setLoginSuccesfull("successfull");

            }else{
                console.log(response);
                showConfirm(false);
                setErrorNotification(true);
                setLoginSuccesfull("unsuccessfull");
            }
        })

    }


    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}  id="login-form" className={`${loginSuccesfull}`}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={userName}  onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
            {confirm && (<p className="confirm-message">Login was successfull</p>)}
            {errorNotification && (<p className="error_message">Your password or username is incorrect</p>)}
        </>
    )
}

export default LoginBubble