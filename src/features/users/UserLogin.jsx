import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { login } from './UserSlice';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';

import { useNavigate } from 'react-router-dom';


export default function UserLogin(){
    const users=useSelector((state)=>{return state.users});
    const dispatch = useDispatch();

    const navigate=useNavigate();

    function onFinish(e){
        users.register_users.forEach((item)=>{
            if(item.user===e.username&&item.password===e.password){
                dispatch(login(item));
                navigate("../");

            }
        })
    }


    function onFinishFailed(){

    }

    


    return  (
        <div className='register'>
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
                    Submit
                </Button>
                </Form.Item>
            </Form>
            <Link to="../register">Register New Account</Link>
        </div>
);

}

