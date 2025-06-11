import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from "antd";
import PostCard from '@/components/post/PostCard';
import PostForm from '@/components/post/PostForm';
import Comment from '@/components/comment/Comment';
import Profile from '@/components/user/Profile';
import NotificationButton from "@/components/notifications/NotificationButton";
import { LOAD_POSTS_REQUEST } from '@/reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_COMPLAIN_REQUEST } from '@/reducers/complain';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';
import AnimalList from '@/components/animal/AnimalList';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';

//// import 수정
const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
  const { mainComplainCard } = useSelector((state) => state.complain);
  const id = user?.id;

  const { myAnimals, selectedAnimal } = useSelector((state) => state.animal);

  useEffect(() => {
    if (mainPosts.length === 0) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
        data: { lastId: 0 },
      });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollY + clientHeight > scrollHeight - 200) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: { lastId }, // 꼭 객체로 감싸야 함
          });
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  useEffect(() => {
    if (user) {
      dispatch({ type: 'LOAD_ANIMAL_LIST_REQUEST' });
    }
  }, [user, dispatch]);

  // 신고 당한 유저 글 보이지 않게 처리
  useEffect(() => {
    dispatch({
      type: LOAD_COMPLAIN_REQUEST,
    });
  }, [dispatch]);

  return (

    <AppLayout>
      <AnimalList animals={myAnimals} />
      {user && <PostForm />}
      {mainPosts
        .filter((post) => {
          const openScope = post.OpenScope?.content;
          const myId = user?.id;
          const postOwnerId = post.UserId;

          const isUserBlinded = mainComplainCard.some(
            (report) => report.targetId === post.User?.id && report.isBlind && report.targetType === TARGET_TYPE.USER
          );
          // 신고된 유저의 글을 제외
          if (isUserBlinded) return false;

          if (myId === postOwnerId) return true;

          // 전체공개
          if (openScope === 'public') return true;

          // 나만 보기
          if (openScope === 'private') return false;

          // 팔로워 공개
          const followings = user?.Followings?.map(u => u.id) || [];
          if (openScope === 'follower') {
            return followings.includes(postOwnerId);
          }
          // 그룹은 홈에서 제외
          if (openScope === 'group') return false;
          return false;
        })
        .map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
    </AppLayout>
  );
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

export default Home;
