import React from "react";
import AppLayout from "../components/AppLayout";
import 'antd/dist/antd.css';
import Notification from "../components/Notification";
import Profile from '../components/Profile'
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import ComplainCard from '../components/ComplainCard';
import PostCard from "../components/PostCard";
import TARGET_TYPE from "../../shared/constants/TARGET_TYPE";

const Home = () => {
  return (
    <AppLayout>
      <>

        <Profile TARGET_TYPE={TARGET_TYPE.USER} />
        <Comment TARGET_TYPE={TARGET_TYPE.COMMENT} />
        <PostCard TARGET_TYPE={TARGET_TYPE.POST} />
        <ComplainCard />
      </>
    </AppLayout>
  );
}

export default Home;