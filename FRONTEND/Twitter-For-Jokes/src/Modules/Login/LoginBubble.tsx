import {useState} from "react";

function LoginBubble() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const user = {
            username: userName,
            password: password,
        }

        fetch("http://localhost:65451/api/Authentication", { //link needs to be added later
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user),
            credentials: "include",
        }).then(response => {
            if (response.ok) {
                console.log(response);
            }else{
                console.log(response);
            }
        })

    }
    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} id="login-form">
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
        </>
    )
}

export default LoginBubble