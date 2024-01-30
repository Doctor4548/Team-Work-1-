import { useSelector,useDispatch } from "react-redux";
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { newUser } from "./UserSlice";
import { useNavigate } from "react-router-dom";


export default function UserRegister(){
    const users = useSelector((state)=> {return state.users.register_users});

    let exist=false;
    const navigate=useNavigate();

    const dispatch = useDispatch();

    function onFinish(e){
        if(e.repeat_password===e.password){

            exist=false;
        
            users.forEach((item)=>{
                if(item.user===e.username){         
                    exist=true;
                }
            })
            if(!exist){
                dispatch(newUser({
                    user: e.username,
                    password: e.password,
                }))

                navigate('../login');
            }
        }
    }

    function onFinishFailed(){

    }



    return(
        <div className="register">
            <h2>Register A New Account</h2>
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
                Submit
                </Button>
            </Form.Item>
            </Form>
        </div>

      );

}
