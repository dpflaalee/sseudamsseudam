import React from 'react';
import AppLayout from '@/components/AppLayout';
import Profile from '@/components/user/Profile';
import PostCard from '@/components/post/PostCard';

import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';
import wrapper from '../../../store/configureStore';
import { LOAD_USER_POSTS_REQUEST } from '../../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../../reducers/user';
const MyPage = () => {
    const user = useSelector(state => state.user)
    const {mainPosts} = useSelector(state => state.post)
    const router = useRouter();
    const {myPage} = router.query;
    console.log('myPage',myPage);
    return (
        <AppLayout>
            <Profile postUserId={myPage} />
             {mainPosts.map((c) => {
                    return (
                      <PostCard post={c} key={c.id} />
                    );
                  })}
        </AppLayout>
    );
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => { 
    console.log('context.params?.id=',context.params);
    const {myPage} = context.params;
    console.log('mypage=,',myPage);
  //1. cookie 설정
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  
  if (context.req  && cookie ) { axios.defaults.headers.Cookie = cookie;   }
  //2. redux 액션
  context.store.dispatch({ type:LOAD_MY_INFO_REQUEST });
 //context.store.dispatch({ type: LOAD_USER_POSTS_REQUEST  , data: context.params.myPage,});
 //context.store.dispatch({ type: LOAD_USER_REQUEST,   data: context.params.myPage, });
  context.store.dispatch(END);

//   try{
//     const res = await axios.get(`http://localhost:3065/user/myPage/${userId}`);
//     const userData = res.data;
//     await  context.store.sagaTask.toPromise();
//     const state = context.store.getState();
//     return {
//       props: {
//           userData,
//       }
//     }
//   }catch(error){
//     console.log('유저 조회 실패:',error);
//     return {
//         notFound: true,
//     }
//   }
await  context.store.sagaTask.toPromise();
    const state = context.store.getState();

}); 
export default MyPage;