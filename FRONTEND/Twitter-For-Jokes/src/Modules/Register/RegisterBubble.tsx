import {useState} from "react";

/*validation NEED TO BE ADDED: any of inputs cannot be empty; the username must not already exist*/

function RegisterBubble() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [showNotif, setShowNotif] = useState(false);
    const [showPasswordNotif, setShowPasswordNotif] = useState(false);
    const [showPasswordMatchingNotif, setShowPasswordMatchingNotif] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            setShowNotif(true);
            return;
        }

        if (password.length < 8) {
            setShowPasswordNotif(true);

        }
        if (password != passwordAgain) {
            setShowPasswordMatchingNotif(true)
        }
        //setShowNotif(false);

        const newUser = {
            username: username,
            password: password,
        }

        fetch("http://localhost:5000/xxx",{ //url needs to be changed
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser),
        }).then(response =>{
            if (response.ok) {
                console.log(response);
            }
            else{
                console.log(response);
            }
        } )
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
                    <label htmlFor="passwordAgain">Password</label>
                    <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="passwordAgain">Repeat Password</label>
                    <input id="passwordAgain" type="password" name="passwordAgain" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>

            {showNotif && (
                <p id="register-notif" className="visit this_error_message">Username nor password cannot be empty.</p>
            )}
            {showPasswordNotif && (
                <p id="password-notif" className="visit this_error_message">Passowrd must contain 8 characters minimally.</p>
            )}
            {showPasswordMatchingNotif && (
                <p id="password-matching-notif" className="visit this_error_message">Password are not matching</p>
            )}
        </>
    );

}

export default RegisterBubble;
