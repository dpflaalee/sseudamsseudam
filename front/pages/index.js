import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';
import { Divider } from "antd";
import NotificationButton from "@/components/notifications/NotificationButton";

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const { mainComplainCard } = useSelector((state) => state.complain);
  return (
    <AppLayout>
      <>
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