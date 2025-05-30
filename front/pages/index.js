import React from "react";
import AppLayout from "../components/AppLayout";
import 'antd/dist/antd.css';
import Notification from "../components/notifications/Notification";
import Profile from '../components/Profile'
import Comment from "../components/Comment";
<<<<<<< HEAD
import ComplainCard from '../components/ComplainCard';
import PostCard from "../components/PostCard";
import TARGET_TYPE from "../../shared/constants/TARGET_TYPE";
=======
import ComplainCard from '../components/complains/ComplainCard';
import PostCard from "../components/PostCard";
import { useSelector } from 'react-redux';
import { Divider } from "antd";
import NotificationButton from "@/components/notifications/NotificationButton";
>>>>>>> origin/SH_0529

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const { mainComplainCard } = useSelector((state) => state.complain);
  return (
    <AppLayout>
<<<<<<< HEAD
      <>

        <Profile TARGET_TYPE={TARGET_TYPE.USER} />
        <Comment TARGET_TYPE={TARGET_TYPE.COMMENT} />
        <PostCard TARGET_TYPE={TARGET_TYPE.POST} />
        <ComplainCard />
      </>
=======
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
>>>>>>> origin/SH_0529
    </AppLayout>
  );
}

export default Home;