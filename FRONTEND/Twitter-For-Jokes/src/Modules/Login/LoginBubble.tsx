import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useAuth} from "../Contexts/AuthContext.tsx";
import Loading from "../Global/Loading.tsx";
import {useReward} from "partycles";
import {useRef} from "react";

function LoginBubble() {
    const navigate = useNavigate();
    const {checkAuth} = useAuth();
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccesfull, setLoginSuccesfull] = useState("");
    const [errorNotification, setErrorNotification] = useState(false);
    const [confirm, showConfirm] = useState(false);
    const [loading , setLoading] = useState(false);

    const logInButton = useRef<HTMLButtonElement>(null);


    const {reward} = useReward(logInButton as React.RefObject<HTMLElement>, 'fireworks',{
        particleCount: 90,
        spread: 9,
        colors: ['#ff0000', '#00ff00', '#0000ff'],
    });


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorNotification(false);
        showConfirm(false)
        setLoginSuccesfull("");

        const user = {
            username: userName,
            password: password,
        }

        setLoading(true);

        fetch("http://localhost:65451/api/Authentication", {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user),
            credentials: "include",
        }).then(async (response) => {
            if (response.ok) {
                await checkAuth();

                console.log(response);

                setUsername("")
                setPassword("")
                showConfirm(true);
                setLoginSuccesfull("successfull");
                toast.success("Login successfull");

                setLoading(false);
                await reward();
                navigate("/feed");
            }else{
                console.log(response);
                showConfirm(false);
                setErrorNotification(true);
                setLoginSuccesfull("unsuccessfull");

                setLoading(false);
                toast.error("Login failed");

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
            <button type="submit" ref={logInButton}>Login</button>
        </form>
            {loading && <Loading />}
            {confirm && (<p className="confirm-message">Login was successfull</p>)}
            {errorNotification && (<p className="error_message">Your password or username is incorrect</p>)}
        </>
    )
}

export default LoginBubble