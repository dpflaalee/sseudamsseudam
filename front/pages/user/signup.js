import React,{ useState, useCallback,useEffect } from "react";
import {Button, Checkbox, Form, Input } from "antd";
import Head from 'next/head';
import AppLayout from "../../components/AppLayout";
import userInput from '../../hooks/userInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';  
import Router from 'next/router';

import { SIGN_UP_REQUEST } from '../../reducers/user';

//1. SIGNUP_UP_REQUEST  
//import { SIGN_UP_REQUEST } from '../reducers/user';  
//2. dispatch, useSelector 

const ErrorMessage = styled.div`color:red;`;   //style.div( color:red; )
const UnderlineInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  box-shadow: none;

  &:focus,
  &.ant-input-focused {
    border-bottom: 2px solid #1677ff;
    box-shadow: none;
  }
`;

const signup = () => {
  console.log('SIGN_UP_REQUEST', SIGN_UP_REQUEST);
    const {signUpLoading , signUpDone , signUpError , user} = useSelector( state =>state.user );
  // 4. dispatch 선언  ##
  const dispatch = useDispatch();

  useEffect(() => { 
    if ( user &&  user.id) {   Router.replace('/');  }
  } , [user &&  user.id]);

  useEffect(() => {
    if ( signUpDone ) {   Router.replace('/');   }
  } , [signUpDone]);

  useEffect(() => { 
    if ( signUpError ) {  alert(signUpError);   }
  } , [signUpError]);

    //const [email, setChangeEmail] = userInput('');
    const [nickname, onChangeNickname] = userInput('');
    //const [password, setChangePassword] = userInput(''); 

    const [email, setChangeEmail] = useState('');
    const onChangeEmail = useCallback((e) => {
      setChangeEmail(e.target.value)
    },[])
    const [username, setChangeUsername] = useState('');
    const onChangeUsername = useCallback((e) => {
      setChangeUsername(e.target.value);

    },[])
    const [phoneNum, setChangePhoneNum] = useState('');
    const [phoneNumRegError, setPhoneNumRegError] = useState(false);
    const [phoneNumLenError, setPhoneNumLenError] = useState(false);
    const onChangePhoneNum = useCallback((e) => {
      setPhoneNumRegError(false);
      setPhoneNumLenError(false);
      let number = e.target.value; 
      const invalidRegex = /[0-9]+/g;
      const invalidStrRegex = /[^0-9]+/g;

      const cleanNumber = number.replace(invalidRegex,'');
      //일단 전화번호를 11자리 받으면 검사하기
      if(invalidStrRegex.test(number)){
        setChangePhoneNum(number);
        setPhoneNumRegError(true);
        return;
      }
      if(number.length >=0 && number.length <= 11){
        setChangePhoneNum(number);
        setPhoneNumRegError(false);
      }else{
        setPhoneNumLenError(true);
        return;
      }
      //숫자만 받기
      setChangePhoneNum(number);
        },[]);
    
    const [authenNum, setChangeAuthenNum] = useState('');
    const [authenNumError, setAuthenNumError] = useState(false);
    const onChangeAuthenNum = useCallback((e) => {
      setChangeAuthenNum(e.target.value);
    },[]);
    
    // const [nickname, setChangeNickname] = useState('');
    // const onChangeNickname = useCallback((e) => {
    //   setChangeNickname(e.target.value);

    // },[])
  const [password, setChangePassword] = useState('');   // userInput  줄이기
  const [passwordRegError, setPasswordRegError] = useState(false);
  const onChangePassword = useCallback((e) => {
      const passRegex = /^[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
      const password = e.target.value;
      
      const flag = passRegex.test(password);
      
      setChangePassword(e.target.value);
  },[password]);
  const [passwordRe, setChangePasswordRe] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordRe = useCallback((e) => { 
    setChangePasswordRe(e.target.value);
    setPasswordError(e.target.value   !==  password);  // !==
  } , [password]);

  // const [check, setCheck] = useState('');
  // const [checkError, setCheckError] = useState(false);
  // const onChangeCheck = useCallback((e) => {   //console.log(e.target.checked);
  //   setCheck(e.target.checked);     // true
  //   setCheckError(false);
  // } , []);

  const onSubmitForm = useCallback(() => { 
    if (password !== passwordRe) { return setPasswordError(true); }
   // if (!check) { setCheckError(true); }
    if(!phoneNumRegError){
      return setPhoneNumRegError(true);
    }
    if(!phoneNumLenError){
      return setPhoneNumLenError(true);
    }
    return dispatch({
      type: SIGN_UP_REQUEST, 
      data:{ username, phoneNum, email, password, nickname  }
    }); 
    // 5. dispatch ###
  } , [username, phoneNum, email, password, nickname]);
    return (
         <>
      <Head>
        <meta charSet="utf-8"/>
        <title> Signup | TheJoa </title>
      </Head>
      <AppLayout>
         <Form  layout='vertical'  style={{ margin:'2%' }}  onFinish={onSubmitForm}  > 
        
        {/* <Form  layout='vertical'  style={{ margin:'2%' }}  > */}
          <Form.Item>
            <label htmlFor='username'></label>
            <UnderlineInput placeholder='이름' id='username'
                value={username} onChange={onChangeUsername}    name='username' required />
          </Form.Item>
          <Form.Item>
            <label htmlFor='email'></label>
            <UnderlineInput placeholder='이메일' id='email'
                value={email} onChange={onChangeEmail}    name='email' required />
          </Form.Item>
          <Form.Item>
            <div style={{display:'flex'}}>
                <label htmlFor='phone'></label>
                <UnderlineInput placeholder='휴대폰' id='phone'
                    value={phoneNum} onChange={onChangePhoneNum}    name='phone' required />
                <Button>인증번호 전송</Button>
              </div>
                {phoneNumRegError   && <ErrorMessage>휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.</ErrorMessage>}
                {phoneNumLenError   && <ErrorMessage>휴대전화번호: 11자리까지 입력가능합니다.</ErrorMessage>}
          </Form.Item>
          <Form.Item>
             <div style={{display:'flex'}}>
             
                <label htmlFor='authenNum'></label>
                <UnderlineInput placeholder='인증번호' id='authenNum'
                    value={authenNum} onChange={onChangeAuthenNum}  name='authenNum' required />
                <Button>확인</Button>
            </div>
          </Form.Item>
          <Form.Item>
             <label htmlFor='password'></label>
            <UnderlineInput placeholder='비밀번호입력(최소 8~12자리 특수문자포함하여 작성)' id='password'
              value={password} onChange={onChangePassword} name='password' required />
              {/* {passwordRegError   && <ErrorMessage>비밀번호를 확인해주세요. </ErrorMessage>} */}
          </Form.Item>
          <Form.Item>
            <label htmlFor='password-re'></label>
            <UnderlineInput placeholder='비밀번호입력 체크' id='password-re'
              value={passwordRe} onChange={onChangePasswordRe} name='passwordRe' required />
            {passwordError   && <ErrorMessage>비밀번호를 확인해주세요. </ErrorMessage>}
          </Form.Item>
          <Form.Item>
             <label htmlFor='nickname'></label>
            <UnderlineInput placeholder='닉네임' id='nickname'
                value={nickname} onChange={onChangeNickname}  name='nickname'  required />
          </Form.Item>
          <Form.Item>
           
            {/* <Checkbox name='check' id='check' checked={check}
                      onChange={onChangeCheck}
            ></Checkbox>  */}
            {/* {checkError   && <ErrorMessage>약관에 동의하셔야 합니다. </ErrorMessage>} */}
          </Form.Item> 
          <Form.Item>

            <Button type='primary'   htmlType='submit' loading={signUpLoading} style={{width:'100%'}} >회원가입</Button>
            {/* <Button type='primary'   htmlType='submit'  style={{width:'100%'}} >회원가입</Button> */}
          </Form.Item>
        </Form>
      </AppLayout>
    </>
    )
}

export default signup;