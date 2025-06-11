import React,{useEffect} from "react";
import AppLayout from "@/components/AppLayout";
import FollowTabMenu from "@/components/user/FollowTabMenu";
import Profile from "@/components/user/Profile";

import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';
import wrapper from '../../../../store/configureStore';
import { LOAD_USER_POSTS_REQUEST } from '../../../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../../../reducers/user';
import FollowList from "@/components/user/FollowList";
const MyFollow = () => {
    const router = useRouter();
    const {myFollow} = router.query;
    console.log('myPage222',myFollow );
    //const {myPage} = router.query;
    useEffect(() => {
      if (!router.isReady) return;
      
    }, [router.isReady]);
////////////////////////////
  return (
    <AppLayout>
      <Profile postUserId={myFollow} />
      {/* followList에 1 = 팔로우, 2 = 팔로잉을 보낸다 */}
      <FollowTabMenu />
      {/* <FollowList /> */}
    </AppLayout>
  );
}
////////////////////////////////////////
export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
  //1. cookie설정
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if(context.req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  //2. redux 액션
  context.store.dispatch({type:LOAD_MY_INFO_REQUEST});
  //context.store.dispatch({type:LOAD_POSTS_REQUEST});
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
});
////////////////////////////////////////
export default MyFollow;