import { Link } from 'react-router-dom';
import logoImg from '../../assets/Logo.png';
import './NavBar.css';


function Nav() {
    return (
        <header>
            <nav>
                <div className="tfj-bar">
                    <Link className="" to="/">Home</Link>
                    <img src={logoImg} alt="Logo" style={{width: '60%'}} />
                    <Link to="/feed">Jokes</Link>
                    {/*<Link to="/playground">PlayGround</Link>*/}
                </div>
            </nav>
        </header>
    )
}

export default Nav;

