import React, { useState, useCallback, useEffect } from "react";
import { MailOutlined, HomeOutlined, NotificationOutlined, SearchOutlined, TeamOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from 'react-redux';  //#2. redux - 
import styled from 'styled-components';
import Link from 'next/Link';
import userInput from '@/hooks/userInput';
import Router from 'next/router';
import { LOG_IN_REQUEST } from '@/reducers/user';

import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../../reducers/user';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { useCookies } from "react-cookie";
const CusLink = styled(Link)`color: #aaa`;

const LoginForm = () => {
  const dispatch = useDispatch();  //#4.   redux
  const [cookies ,setCookie, removeCookie] = useCookies(['userEmail']);
  const { logInLoading, logInDone, logInError } = useSelector(state => state.user);

  ///////////////////////////////////////////// code
  const [email, onChangeEmail] = useState(cookies.userEmail||'');
  const [password, setChangePassword] = useState('');
  //const [email, onChangeEmail] = useState(cookies.userEmail || '');
  //const [password, onChangePassword] = useState('');

  const [checkEmail, setCheckEmail] = useState(!!cookies.userEmail);

  const [errLoginFlag, setErrLoginFlag] = useState(false);
  const [errLoginMsg, setErrLoginMsg] = useState('');

  useEffect(() => {
    if(logInDone){
      console.log('logInDone');
      Router.replace('/main');
    }
  },[logInDone])

  useEffect(() => {
    if (logInError) {
      console.log('logInError');
        setErrLoginFlag(true);
        setErrLoginMsg(logInError);
        //alert(logInError);
        logInError;
      } 
  }, [logInError]);
  useEffect(() => {
    if (cookies.userEmail) {
      console.log(cookies.userEmail);
      onChangeEmail(cookies.userEmail);
      setCheckEmail(true);
    }
  }, [cookies.userEmail,email,checkEmail]);
  const onChangePassword = useCallback((e) => {  
    setChangePassword(e.target.value);
  },[password])
   // 이메일 기억하기 체크박스 핸들러
  const onSaveEmail = useCallback((e) => {
    const checked = e.target.checked;
    setCheckEmail(checked);

    if (checked) {
      setCookie('userEmail', email, {
        path: '/',
        maxAge: 60 * 5,
        //secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    } else {
      removeCookie('userEmail', { path: '/' });
    }
  }, [email,checkEmail]);
   // 이메일 입력이 바뀔 때 쿠키도 갱신 (체크한 경우만)
  const onChangeEmailWithCookie = useCallback((e) => {
    onChangeEmail(e.target.value);
    console.log('email확인',e.target.value);
    if (checkEmail) { 
      setCookie('userEmail', e.target.value, {
        path: '/',
        maxAge: 60 * 5,
        //secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }
  }, [checkEmail,email]);

  const onSubmitForm = useCallback((e) => {
    setErrLoginFlag(false);
    setErrLoginMsg('');
    console.log('이메일/패스워드');
    console.log(email, password);
    //setIsLoggedIn(true);
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password }
    });
    
  }, [email, password,cookies]);

  return (
    <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
      <Form style={{
        width: '100%',         // form이 div 꽉 채우도록
        maxWidth: '700px',     // 실제 form 너비 제한
        margin: '0 auto',      // 가운데 정렬
        border: '1px solid #ccc',
        padding: '20px',
        paddingRight: '120px',
        boxSizing: 'border-box',

      }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          email: cookies.userEmail || '', // <-- 여기를 수정!
          remember: !!cookies.userEmail, // <-- remember 체크박스도 쿠키 여부에 따라 초기화
        }}
        onFinish={onSubmitForm}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }} style={{ paddingLeft: '100px' }}>
          <h1>INSTAGRAM</h1>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          name="email"
          rules={[
            {
              required: true,
              message: '이메일을 확인해주세요',
            },
          ]}
        >

          <Input  placeholder="user@gmail.com 형식으로 입력"
            value={email} onChange={onChangeEmailWithCookie} required />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 확인해주세요",
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
          <Checkbox checked={checkEmail} onChange={onSaveEmail}>이메일 기억하기</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" loading={logInLoading} style={{ width: '100%' }} htmlType="submit">
            로그인
          </Button>
          <div style={{ marginLeft: '20px', textAlign: 'center', marginTop: '10px' }}>
            <CusLink href={"/user/signup"} style={{ paddingRight: '50px' }}>회원가입</CusLink>
            <CusLink href={"/user/find"}>비밀번호 찾기</CusLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

///////////////////////////////////////////////////////////
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  //1. cookie 설정
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }

  //2. redux 액션
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: LOAD_POSTS_REQUEST });
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
});
///////////////////////////////////////////////////////////
export default LoginForm;