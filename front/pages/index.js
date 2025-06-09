import React from "react";
import LoginForm from "../components/user/LoginForm";

import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import axios from 'axios';  
import { END } from 'redux-saga'; 
import wrapper from '../store/configureStore';

const login = () => { 
    return (
        <div
             style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh", // 화면 전체 높이 확보
            }}
        >
            <LoginForm />
        </div>
    );
};

///////////////////////////////////////////////////////////
// export const getServerSideProps = wrapper.getServerSideProps(async (context) => { 
//   //1. cookie 설정
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
  
//   if (context.req  && cookie ) { axios.defaults.headers.Cookie = cookie;   }

//   //2. redux 액션
//   context.store.dispatch({ type:LOAD_MY_INFO_REQUEST});
//   //context.store.dispatch({ type: LOAD_POSTS_REQUEST });
//   context.store.dispatch(END);

//   await  context.store.sagaTask.toPromise();
// }); 
///////////////////////////////////////////////////////////
export default login;