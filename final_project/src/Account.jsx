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
    <Router>
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
    </Router>
    
  );

}

export default Account;
