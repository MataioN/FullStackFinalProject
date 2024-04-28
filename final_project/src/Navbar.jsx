import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css'

const Navbar=()=>{
    return (    
                <div className='navBar'>
                    <div className='home' >
                        <Link to="/Home">Logo</Link>
                    </div>
                    <div style = {{display: 'flex', justifyContent: 'end'}}>
                        <div className="karaoke">
                        <Link to="/Karaoke">
                            <button>Karaoke!</button></Link>
                        </div>
                        <div className="signup">
                        <Link to="/Signup">
                            <button>Sign Up!</button></Link>
                        </div>
                        <div className='login'>
                        <Link to="/Login">
                            <button>Login!</button></Link>
                        </div>
                    </div>
                    
    
                </div>
    )

}

export default Navbar;