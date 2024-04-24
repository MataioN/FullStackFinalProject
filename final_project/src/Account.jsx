import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';

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
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        

        <Routes>
            <Route exact="true" path="/" element={<Login />} >
            </Route>
            <Route path="/signup" element={<Signup />}>
            </Route>
        </Routes>
        </div>
    </Router>
    
  );

}

export default Account;
