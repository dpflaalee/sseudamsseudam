import React,{ useState, useCallback } from "react";
import {Button, Checkbox, Form, Input } from "antd";
import Head from 'next/head';
import AppLayout from "../../components/AppLayout";
import userInput from '../../hooks/userInput';
import styled from 'styled-components';
//1. SIGNUP_UP_REQUEST  
//import { SIGN_UP_REQUEST } from '../reducers/user';  
//2. dispatch, useSelector 
import { useDispatch, useSelector } from 'react-redux';  

const UnderlineInput = styled(Input)`
  border: none;
  border-bottom: 5px solid #d9d9d9;
  border-radius: 0;
  box-shadow: none;

  &:focus,
  &.ant-input-focused {
    border-bottom: 2px solid #1677ff;
    box-shadow: none;
  }
`;

const signup = () => {
    // const { signUpLoading , signUpDone , signUpError , user} = useSelector( state =>state.user );
  // 4. dispatch 선언  ##
  const dispatch = useDispatch();

    const [email, onChangeEmail] = userInput('');
  const [nickname, onChangeNickname] = userInput('');
  const [password, onChangePassword] = userInput('');   // userInput  줄이기
 
  const [passwordRe, setChangePasswordRe] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordRe = useCallback((e) => { 
    setChangePasswordRe(e.target.value);
    setPasswordError(e.target.value   !==  password);  // !==
  } , [password]);

  const [check, setCheck] = useState('');
  const [checkError, setCheckError] = useState(false);
  const onChangeCheck = useCallback((e) => {   //console.log(e.target.checked);
    setCheck(e.target.checked);     // true
    setCheckError(false);
  } , []);

  const onSubmitForm = useCallback(() => { 
    if (password !== passwordRe) { return setPasswordError(true); }
    if (!check) { setCheckError(true); }

    return dispatch({
      type: SIGN_UP_REQUEST, 
      data:{ email, password, nickname  }
    }); 

    // 5. dispatch ###
  } , [email, password, passwordRe , check]);
    return (
         <>
      <Head>
        <meta charSet="utf-8"/>
        <title> Signup | TheJoa </title>
      </Head>
      <AppLayout>
         <Form  layout='vertical'  style={{ margin:'2%' }}  onFinish={onSubmitForm}  > 
        {/* <Form  layout='vertical'  style={{ margin:'2%' }}  > */}
            <label htmlFor='email'>아이디</label>
          <Form.Item>
            <UnderlineInput placeholder='user@email.com' id='email'
                value={email} onChange={onChangeEmail}    name='email' required />
          </Form.Item>
          <Form.Item>
             <label htmlFor='nickname'>닉네임</label>
            <UnderlineInput placeholder='닉네임을 작성해주세요' id='nickname'
                value={nickname} onChange={onChangeNickname}  name='nickname'  required />
          </Form.Item>
          <Form.Item>
             <label htmlFor='password'>비밀번호</label>
            <UnderlineInput.Password placeholder='비밀번호입력' id='password'
              value={password} onChange={onChangePassword} name='password' required />
          </Form.Item>
          <Form.Item>
            <label htmlFor='password-re'>비밀번호 체크</label>
            <UnderlineInput.Password placeholder='비밀번호입력 체크' id='password-re'
              value={passwordRe} onChange={onChangePasswordRe} name='passwordRe' required />
            {passwordError   && <ErrorMessage>비밀번호를 확인해주세요. </ErrorMessage>}
          </Form.Item>
          
          <Form.Item>
           
            <Checkbox name='check' id='check' checked={check}
                      onChange={onChangeCheck}
            ></Checkbox> 
            {checkError   && <ErrorMessage>약관에 동의하셔야 합니다. </ErrorMessage>}
          </Form.Item> 
          <Form.Item>
            {/* <Button type='primary'   htmlType='submit' loading={signUpLoading}  >회원가입</Button> */}
            <Button type='primary'   htmlType='submit'  style={{width:'100%'}} >회원가입</Button>
          </Form.Item>
        </Form>
      </AppLayout>
    </>
    )
}

export default signup;