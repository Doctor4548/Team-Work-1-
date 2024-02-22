import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from './UserSlice';
import { useDispatch, useSelector} from 'react-redux';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UserLogin(){

    const [incorrect,setIncorrect]=React.useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const token=useSelector((state)=>{return state.users.loginin_user});

    React.useEffect(()=>{
        
        if(token.length>0){
            navigate("../");
        }

    },[token])

    async function onFinish(e){
        const code = await axios({
            headers: {
                "Content-Type": "application/json"
            },
            url: 'http://47.251.69.199/user/login',
            method: "POST",
            data: {
                username: e.username,
                password: e.password,
            }
        })

        if(code.data.code===200){
            dispatch(login(code.data))
            navigate("../")
            //console.log(code.data.data)

        }
        else{
            setIncorrect(true);

        }
    }

    function gotoGegister(){
        navigate("../register")

    }


    function onFinishFailed(){

    }
    const warnStyle={
        color: "red"
    }

    const registerStyle={
        backgroundColor: "rgba(47, 255, 47, 0.568)",
        margin: "20px"
    }

    /*
                <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>

                <Button type="primary" htmlType="submit" style={registerStyle} onClick={gotoGegister}>
                    Goto Register
                </Button>

                </Form.Item>
            </Form>
    
    */
    
    return  (
        <div className='loginPage'>
            <h2 className='loginText'>Login</h2>
            {incorrect &&<h4 style={warnStyle}>The username or password is incorrent</h4>}
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
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    {/*<a className="login-form-forgot" href="">
                    Forgot password
                    </a>*/}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                    Or <a onClick={gotoGegister}>register now!</a>
                </Form.Item>
            </Form>



        </div>
);

}

