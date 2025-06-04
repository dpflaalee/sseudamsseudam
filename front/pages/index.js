import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostCard from '@/components/post/PostCard';
import PostForm from '@/components/post/PostForm';

//// import 수정
const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      {<PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard post={c} key={c.id} />
        );
      })}

    </AppLayout>
  );
}

export default Home;