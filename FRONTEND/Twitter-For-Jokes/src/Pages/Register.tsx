import {useState} from "react";
import './Register.css'


/*validation NEED TO BE ADDED: any of inputs cannot be empty; the username must not already exist*/

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showNotif, setShowNotif] = useState(false);
    const [showPasswordNotif, setShowPasswordNotif] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            setShowNotif(true);
            return;
        }

        if (password.length < 8) {
            setShowPasswordNotif(true);

        }
        setShowNotif(false);
    }




    return (
        <>
            <h1>Create account</h1>
            <form id="register-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit">Create</button>
            </form>

            {showNotif && (
                <p id="register-notif" className="visit this_error_message">Username nor password cannot be empty.</p>
            )}
            {showPasswordNotif && (
                <p id="password-notif" className="visit this_error_message">Passowrd must contain 8 characters minimally.</p>
            )}
        </>
    );

}





export default Register;