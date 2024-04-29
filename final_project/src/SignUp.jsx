import React, { useState } from 'react';
import './Signup.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup email:", email, "password:", password);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const baseUrl = "http://localhost:3001/"
  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    axios.post(`http://localhost:3001/signup`, values)
        .then((response) => {
        // Handle successful response
        console.log('Signup successful:', response.data);
        })
        .catch((error) => {
        // Handle error
        console.error('Error signing up:', error);
        if (error.response && error.response.data) {
          // Check for specific error messages from the server
          const err = error.response.data['error'];
          /*form.resetFields();
          form.setFields({
            '__global__' :{
              errors: [{ message: err }]}
          });*/
        } else {
          // Generic error message
          /*form.setFields({
            '__global__': {
              errors: [{ message: 'An error occurred during signup. Please try again later.' }],
            },
          });*/
        }

        }); 
  }; 

  

  return (
    /** 
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          /> 
          <input 
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
      </form>
    </div>
    */

   <div className='main_div'>
   <div >
            <div >
                <h1 style= {{textAlign:'center'}}>Sign Up</h1>
                <Form
                name="normal_signup"
                className="signup-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                
                <Form.Item
                    name="Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your name',
                    },
                    ]}
                    >
                    <Input placeholder="Name" />
                </Form.Item>

<Form.Item
                    name="Email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your email',
                    },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>


                <Form.Item
                    name="Username"
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
                    name="Password"
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
            
                </Form.Item>
            
                <Form.Item style= {{color:'#fff'}}>
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                    Sign Up
                    </Button>
                    or <Link to="/Login">Login</Link> 
                </Form.Item>
                </Form>
            </div>
        </div>
        </div>
  );
};

export default Signup; 