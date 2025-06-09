import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from "antd";
import PostCard from '@/components/post/PostCard';
import PostForm from '@/components/post/PostForm';
import Comment from '@/components/comment/Comment';
import Profile from '@/components/user/Profile';
import NotificationButton from "@/components/notifications/NotificationButton";
import { LOAD_POSTS_REQUEST } from '@/reducers/post';
import AnimalList from '@/components/animal/AnimalList';
//// import 수정
const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
  const { mainComplainCard } = useSelector((state) => state.complain);

  const { userAnimals, selectedAnimal } = useSelector((state) => state.animal);

  useEffect(() => {
    if (hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
      })
    }
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  useEffect(() => {
    function onScroll() {
      console.log(window.screenY, document.documentElement.clientHeight, document.documentElement.scrollHeight)
      if (window.screenY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 200) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: mainPosts[mainPosts.length - 1]?.id,
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      <AnimalList animals={userAnimals} />
      {user && <PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard post={c} key={c.id} />
        );
      })}

    </AppLayout>
  );
}

export default Home;
