import { Link } from "react-router-dom";
import './Homepg.css';

function Navbar () {
    return (
        <>
            <div className="bg-image">
                <nav className="neverbackground">
                    <div className="logoContainer">
                        <img src="https://i.ibb.co/9qbR4W0/education-school-logo-design-586739-1335.jpg" className="logo" alt="School Logo" />
                        <br /><small className="schoolName">Mahendran Higher</small><br /><small className="schoolName2">secondary school</small>
                    </div>
                    <div className="Options">
                        <ul className="Options2">
                            <li className="LoginHome"><Link to="/"><a>Home</a></Link></li>
                            <li className="LoginHome"><Link to="/About"><a>About us</a></Link></li>
                            <li className="LoginHome"><Link to="/Contact"><a>Contact us</a></Link></li>
                        </ul>
                        <div className="loginContainer">
                            <ul className="loginDropdown">
                                <li><a className="loginText">Login</a>
                                    <ul className="loginThreeLink">
                                        <li className="loginlink"><Link to="/Admin"><a>Admin</a></Link></li>
                                        <li className="loginlink"><Link to="/Thisar"><a>Thisar</a></Link></li>
                                        <li className="loginlink"><Link to="/Student"><a>Shuthas</a></Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
