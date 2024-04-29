import {React, useState } from "react";
//import { useHistory } from "react-router'dom";
import './Login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = () => {
    const baseUrl = "http://localhost:3001/api/users/"
    const onFinish = (values) => {
        
        console.log('Received values of form: ', values);

        axios.post(baseUrl+ "login", values)
            .then((response) => {
            // Handle successful response
            console.log('Login successful:', response.data);
            message.success('Login successful');
            localStorage.setItem('loggedIn',true);

            })
            .catch((error) => {
            // Handle error
            console.error('Error logging in:', error);
            message.error('Incorrect username or password');
            localStorage.setItem('loggedIn', false);
            //resetFields();
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
                        message: 'Please input your username',
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
                        message: 'Please input your password',
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
                    Log In
                    </Button>
                    or <Link to="/Signup">sign up now!</Link> 
                </Form.Item>
                </Form>
            </div>
        </div>
        </div>
        
      );
};

export default Login;