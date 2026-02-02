import {Link} from "react-router-dom";
import logoImg from '../../assets/Logo.png';
import './NavBar.css';


function Nav() {
    return (
       <>
         <header>
            <div className="registration-box">
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
            </div>

             <nav className="main-navbar">
                 <div className="tfj-bar">
                     <Link to="/Creators">Creators</Link>
                     <Link className="" to="/">
                         <img src={logoImg} alt="Logo" />
                     </Link>
                     <Link to="/feed">Jokes</Link>
                     {/*<Link to="/playground">PlayGround</Link>*/}
                 </div>
             </nav>


         </header>
       </>
    )
}

export default Nav;

