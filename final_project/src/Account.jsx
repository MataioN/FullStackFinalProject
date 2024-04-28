import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import Login from './Login';
import Signup from './SignUp';

function Account() {
  return (
    
    /*<div>
      <h2>Log In | Sign Up</h2>
      <div>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
      </div>
      </div>
  */
    
    <div>
        <Login/>
    <Router>
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                    <li>
                        <Link to="/Signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        

        <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
        </Routes>
        </div>
    </Router>
    </div>
    
  );

}

export default Account;
