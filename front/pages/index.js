import React, {useEffect} from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

const Home = ()=>{
  const { mainPosts } = useSelector((state) => state.post); 

  return (
  <AppLayout>
    { <PostForm />}
    { mainPosts.map((c) => { 
      return (
      <PostCard post={c} key={c.id} />
    );} )}
  </AppLayout>
);
}

export default Home;