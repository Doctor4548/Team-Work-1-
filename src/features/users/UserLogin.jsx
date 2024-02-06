import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { login } from './UserSlice';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UserLogin(){

    const [incorrect,setIncorrect]=React.useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

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
        marginLeft: "20px"
    }
    
    return  (
        <div className='loginPage'>
            <h2>Login</h2>
            {incorrect &&<h4 style={warnStyle}>The username or password is incorrent</h4>}
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
                    Register
                </Button>

                </Form.Item>
            </Form>

        </div>
);

}

