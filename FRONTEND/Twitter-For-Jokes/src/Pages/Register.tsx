import './Register.css'


/*validation NEED TO BE ADDED: any of inputs cannot be empty; the username must not already exist*/

function Register() {
    return (
       <>
            <h1>Create account</h1>
            <form action="/" method="POST" id="register-form">
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                </div>

                <button type="submit">Create</button>
            </form>
       </>
    )
}

export default Register;