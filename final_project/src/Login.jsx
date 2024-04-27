import React, { useState } from "react";
//import { useHistory } from "react-router'dom";
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const history = useHistory(); //initialize useHistory hook
    
    const handleLogin = (e) => {
        e.preventDefault();
        //login authentication logic 
        //history.push("/dashboard") //navigate to dashboard route after succesful login 
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;