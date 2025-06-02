import React, { useState, useEffect } from "react";
import { MailOutlined, HomeOutlined, NotificationOutlined, SearchOutlined, TeamOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from "antd";

const LoginForm = () => {
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
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
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
        <Checkbox>이메일 기억하기</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" style={{width:'100%'}} htmlType="submit">
          로그인
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm;