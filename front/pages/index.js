import 'antd/dist/antd.css';
import Profile from '../components/Profile'
import Comment from "../components/Comment";
import ComplainCard from '../components/complains/ComplainCard';
import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/Post/PostForm';
import PostCard from '../components/Post/PostCard';
import { useSelector } from 'react-redux';
import { Divider } from "antd";
import NotificationButton from "@/components/notifications/NotificationButton";

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const { mainComplainCard } = useSelector((state) => state.complain);
  return (
    <AppLayout>
      <>

        <Profile />
        <Comment />
        <PostCard />
        <ComplainCard />
      </>

      {/* {mainPosts.map((c) => {
        return (
          <PostCard post={c} key={c.id} />
        );
      })}
      <Comment />
      <Profile />

      <Divider />
      {mainComplainCard.map((c) => {
        return (
          <ComplainCard report={c} key={c.id} />
        );
      })} */}

      <NotificationButton />
    </AppLayout>
  );
}

export default Home;