import React from 'react';
import AppLayout from '@/components/AppLayout';
import Profile from '@/components/user/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
const MyPage = () => {
    const user = useSelector(state => state.user)
    console.log('myPage',user?.id);
    return (
        <AppLayout>
            <Profile />
        </AppLayout>
    );
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => { 
    
  //1. cookie 설정
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  
  if (context.req  && cookie ) { axios.defaults.headers.Cookie = cookie;   }
  //2. redux 액션
  context.store.dispatch({ type:LOAD_MY_INFO_REQUEST });
  //context.store.dispatch({ type: LOAD_USER_POSTS_REQUEST  , data: context.params.id,});
 //context.store.dispatch({ type: LOAD_USER_REQUEST        ,   data: context.params.id, });
  context.store.dispatch(END);

  await  context.store.sagaTask.toPromise();
  
  const state = context.store.getState();
}); 
export default MyPage;