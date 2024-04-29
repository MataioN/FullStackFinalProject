import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import logo from './sing_icon_white.png';

const Navbar=()=>{
    const [loggedIn, setLoggedIn] = useState(0);
    useEffect(()=>{
        const state = localStorage.getItem('loggedIn');
        if (state == 'true') {
            setLoggedIn(1);
        } else {
            setLoggedIn(0);
        }
 
    });
    return (    
                <div className='navBar'>
                    <div className='home' >
                        <Link to="/Home"><img src={logo} alt='microphone logo' class='logo'></img></Link>
                    </div>
                        {loggedIn == 0 ? (
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
                            </div>
                        )
                    }
            
                    
    
                </div>
    )

}

export default Navbar;