import RegisterBubble from "../Modules/Register/RegisterBubble.tsx";
import {Link, Routes} from "react-router-dom";
import "./Register.css"

function Register() {
    return (
       <>
           <RegisterBubble></RegisterBubble>
           <Routes>
               <Route path="/login" element={<Login/>}></Route>
           </Routes>

           <Link to="/Login" id="redirect-to-login">Already have account?</Link>
       </>
    )
}

export default Register;