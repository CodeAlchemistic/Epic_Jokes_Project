import React, {useState} from "react";
/*validation NEED TO BE ADDED: any of inputs cannot be empty; the username must not already exist*/

function RegisterBubble() {
    const [userName, setUserName] = useState("");
    const [password, setpassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [showNotif, setShowNotif] = useState(false);
    const [showPasswordNotif, setShowPasswordNotif] = useState(false);
    const [showPasswordMatchingNotif, setShowPasswordMatchingNotif] = useState(false);
    const [registerSuccesfull, setRegisterSuccesfull] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [showAllradyExisting, setShowAllradyExisting] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setRegisterSuccesfull("");
        setConfirm(false);
        setShowNotif(false);
        setShowPasswordNotif(false);
        setShowPasswordMatchingNotif(false);
        setShowAllradyExisting(false);


        if (userName.trim() === "" || password.trim() === "") {
            setShowNotif(true);
            return;
        }

        if (password.length < 8) {
            setShowPasswordNotif(true);
            return;

        }
        if (password != passwordAgain) {
            setShowPasswordMatchingNotif(true)
            return;
        }
        //setShowNotif(false);

        const newUser = {
            username: userName,
            password: password,
        }


        fetch("http://localhost:65451/api/Users",{ //url needs to be changed
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser),
        }).then(response =>{
            if (response.ok) {
                console.log(response);

                setUserName("");
                setpassword("");
                setPasswordAgain("");

                setRegisterSuccesfull("successfull");
                setConfirm(true);

            }
            else if (response.status === 400) {
                console.log(response);
                setConfirm(false);
                setRegisterSuccesfull("unsuccessfull");
                setShowAllradyExisting(true)
            }
        } )
    }

    return (
        <>
            <h1>Create account</h1>
            <form id="register-form" onSubmit={handleSubmit} className={`${registerSuccesfull}`}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="passwordAgain">Password</label>
                    <input id="password" type="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} />
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

            {confirm && (<p className="confirm-message">Registration was successful</p> )}
            {showAllradyExisting && (<p className="visit this_error_message">This user allredy exists. Chose a diffrent name.</p>)}
        </>
    );

}

export default RegisterBubble;
