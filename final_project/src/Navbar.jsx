import {React, useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import logo from './sing_icon_white.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth';

const Navbar=()=>{
    const navigate = useNavigate();
    //const [loggedIn, setLoggedIn] = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);

    const logout = ()=>{
        setLoggedIn(false);
        localStorage.setItem('loggedIn', false);
        localStorage.removeItem('token');
        navigate('/Home', { replace: true });
    };

    useEffect(()=>{
        const newState = localStorage.getItem('loggedIn');
            if (newState == 'true') {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
    }, []); 
    return (    
                <div className='navBar'>
                    <div className='home' >
                        <Link to="/Home"><img src={logo} alt='microphone logo' class='logo'></img></Link>
                    </div>
                        {loggedIn == false ? (
                        <div style = {{display: 'flex', justifyContent: 'end'}}>
                        <div className="signup">
                        <Link to="/Signup">
                            <button>Sign Up</button></Link>
                        </div>
                        <div className='login'>
                        <Link to="/Login">
                            <button>Login</button></Link>
                        </div>
                        </div>
                        ) : (
                            <div style = {{display: 'flex', justifyContent: 'end'}}>
                                <div className="profile">
                                <Link to="/Profile">
                                <button>Profile</button></Link>
                                </div>
                                <div className="karaoke">
                                <Link to="/Karaoke">
                                <button>Karaoke</button></Link>
                                </div>
                                <div className="logout">
                                <button onClick={logout}>Logout</button>
                                </div>
                            </div>
                        )
                    }
            
                    
    
                </div>
    )

}

export default Navbar;