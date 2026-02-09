import {Link} from "react-router-dom";
import logoImg from '../../assets/Logo.png';
import './NavBar.css';
import {useAuth} from "../Contexts/AuthContext.tsx";
import pfpPicture from "../../assets/usr_icon.png"
import logoutImg from '../../assets/Logout.png';

function Nav() {
    const {user, logOut} = useAuth();

    if (user?.isAuthenticated === true) {
        return (
            <>
                <header>
                    <div className="registration-box">


                    </div>

                    <nav className="main-navbar">
                        <div className="tfj-bar">
                            <div><img src={pfpPicture} alt="" id="user-icon-nav-bar"/> <p>{user.userName}</p></div>
                            <Link to="/Creators">Creators</Link>
                            <Link className="" to="/">
                                <img src={logoImg} alt="Logo" />
                            </Link>
                            <Link to="/feed">Jokes</Link>
                            <img src={logoutImg} alt="" id="Logout" onClick={logOut} />
                            {/*<Link to="/playground">PlayGround</Link>*/}
                        </div>
                    </nav>


                </header>
            </>
        )
    }
    else {
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
}

export default Nav;

