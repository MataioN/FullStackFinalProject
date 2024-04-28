import React, { useState } from "react";
//import { useHistory } from "react-router'dom";
import './Login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = () => {
    /**const [email, setEmail] = useState("");
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
    ); **/

    const [form] = Form.useForm();
    const baseUrl = "http://localhost:3001/"
    const onFinish = (values) => {
        
        console.log('Received values of form: ', values);

        axios.post(baseUrl+ "login", values)
            .then((response) => {
            // Handle successful response
            console.log('Login successful:', response.data);

            })
            .catch((error) => {
            // Handle error
            console.error('Error logging in:', error);
            message.error('Incorrect username or password');
            resetFields();
            });

        
        
      };


      return (
        <div className= "main_div" >
        <div >
            <div >
                <h1 style= {{textAlign:'center'}}>Login</h1>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                >

                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox style= {{color:'#fff'}}>Remember me</Checkbox>
                    </Form.Item>
            
                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                </Form.Item>
            
                <Form.Item style= {{color:'#fff'}}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                    Or <Link to="/Signup">register now!</Link> 
                </Form.Item>
                </Form>
            </div>
        </div>
        </div>
        
      );
};

export default Login;