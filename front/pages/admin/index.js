import React from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';

import { useSelector } from "react-redux";

import PostCard from "../../components/post/PostCard";
import AdminProfile from "@/components/AdminProfile";

const adminPage = () => {
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
  return (
    <AppLayout>
      <>
        <AdminProfile />
        {mainPosts.map((c) => {
          return (
            <PostCard post={c} key={c.id} />
          );
        })}
      </>
    </AppLayout>);
}
////////////////////////////////////////////////////////
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  //1. cookie 설정
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }

  //2. redux 액션
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: LOAD_POSTS_REQUEST });
  context.store.dispatch({ type: LOAD_COMPLAIN_REQUEST });
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();

});
////////////////////////////////////////////////////////
export default adminPage;