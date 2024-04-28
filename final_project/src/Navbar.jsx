import React from 'react';
import {Link} from 'react-router-dom';

const Navbar=()=>{
    return (    
                <div className='navBar'>
                    <div>
                        <Link to="/Home">Logo</Link>
                    </div>
                    <div>
                        <div className="tabs">
                        <Link to="/Login">
                            <button>Sign Up!</button></Link>
                        </div>
                        <div className='favourites'>
                        <Link to="/Login">
                            <button>Login!</button></Link>
                        </div>
                    </div>
                    
    
                </div>
    )

}

export default Navbar;