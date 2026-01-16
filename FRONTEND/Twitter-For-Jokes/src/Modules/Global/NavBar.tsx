import { Link } from 'react-router-dom';
import logoImg from '../../assets/Logo.png';
import './NavBar.css';


function Nav() {
    return (
        <header>
            <nav>
                <Link className="" to="/">Home</Link>
                <img src={logoImg} alt="Logo" style={{width: '20%'}} />
                <Link to="/feed">Feed</Link>
                <Link to="/playground">PlayGround</Link>
            </nav>
        </header>
    )
}

export default Nav;

