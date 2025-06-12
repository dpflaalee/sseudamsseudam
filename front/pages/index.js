import React, { useEffect } from "react";
import LoginForm from "../components/user/LoginForm";

import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import { LOAD_COMPLAIN_REQUEST } from "@/reducers/complain";
import TARGET_TYPE from "../../shared/constants/TARGET_TYPE";

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
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  //1. cookie 설정
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }

  //2. redux 액션
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: LOAD_COMPLAIN_REQUEST });
  //context.store.dispatch({ type: LOAD_POSTS_REQUEST });
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
  const state = context.store.getState();
  const me = state.user.me;
  const complainList = state.complain.mainComplainCard;

  // 👇 신고로 블라인드된 유저인지 확인
  const isBlindedUser = complainList.some((report) =>
    report.targetType === TARGET_TYPE.USER &&
    Number(report.targetId) === Number(me?.id) &&
    report.isBlind === true
  );

  if (me) {
    if (isBlindedUser) {
      return {
        redirect: {
          destination: '/blind', // 예: 블라인드 안내 페이지
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: '/main',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});
///////////////////////////////////////////////////////////
export default login;