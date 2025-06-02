import React, { useState, useCallback, useEffect } from "react";
import { MailOutlined, HomeOutlined, NotificationOutlined, SearchOutlined, TeamOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from 'react-redux';  //#2. redux - 

import Link from 'next/Link';
import userInput from '@/hooks/userInput';
import Router from 'next/router';
import { LOG_IN_REQUEST } from '@/reducers/user'; 


const LoginForm = () => {
  const { logInLoading, logInDone, logInError } = useSelector(state => state.user);
  ///////////////////////////////////////////// code
  const [email, onChangeEmail] = userInput('');
  const [password, onChangePassword] = userInput('');

  const dispatch = useDispatch();  //#4.   redux

  useEffect(() => {
    if(logInDone){
      Router.replace('/');
    }
  },[logInDone])
  useEffect(() => { if (logInError) {  alert(logInError);  } }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    //setIsLoggedIn(true);
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password }
    });
  }, [email, password]);

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
       onFinish={onSubmitForm}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="아이디"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder="user@gmail.com 형식으로 입력" 
             value={email} onChange={onChangeEmail} required   />
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
        <Input.Password placeholder="비밀번호 입력" 
            value={password} onChange={onChangePassword} required />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>이메일 기억하기</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" loading={logInLoading} style={{width:'100%'}} htmlType="submit">
          로그인
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm;