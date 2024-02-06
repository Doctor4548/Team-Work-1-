import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function UserRegister(){

    const [passwordRepeat,setPasswordRepeat]=React.useState(false);
    const [accountAlreadyExisted, setAccountAlreadyExisted]=React.useState(false);
    const navigate=useNavigate();


    async function onFinish(e){
        if(e.repeat_password===e.password){

            const code = await axios({
                headers:{
                    "Content-Type": "application/json"
                },
                method: "POST",
                url: 'http://47.251.69.199/user/register',
                data: {
                    username: e.username,
                    password: e.password,
                }
            })

            if(code.data.code!==200){
                setAccountAlreadyExisted(true);

            }
            else{
                navigate("../login")
            }

        }
        else{
            setPasswordRepeat(true);
        }
    }


    function login(){
        navigate("../login")

    }

    function onFinishFailed(){

    }

    const warnStyle={
        color: "red"
    }

    const resetStyle={
        backgroundColor: "salmon",
        marginLeft: "20px"
    }

    const loginStyle={
        backgroundColor: "rgba(47, 255, 47, 0.568)",
        marginLeft: "20px"
    }

    return(
        <div className="registerPage">
            <h2>Register A New Account</h2>
            {accountAlreadyExisted &&<h3 style={warnStyle}>Username Already Exist</h3>}
            {passwordRepeat && <h4 style={warnStyle}>The repeat password do not match with your password</h4>}
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
                label="Repeat Password"
                name="repeat_password"
                rules={[
                {
                    required: true,
                    message: 'Please repeat your password!',
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
                Register
                </Button>
                <Button type="primary" onClick={login} style={loginStyle}>
                Log In
                </Button>
            </Form.Item>
            </Form>
        </div>

      );

}
