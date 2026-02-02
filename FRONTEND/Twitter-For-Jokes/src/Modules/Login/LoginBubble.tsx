import {useState} from "react";

function LoginBubble() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        }

        fetch("http://localhost:5000/xxxx", { //link needs to be added later
            method: "POST",
            body: JSON.stringify(user),
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
                <input type="text" name="username" id="username" value={username}  onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default LoginBubble