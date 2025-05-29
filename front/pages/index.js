import React from "react";
import AppLayout from "../components/AppLayout";
import 'antd/dist/antd.css';
<<<<<<< HEAD
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";
import Link from "next/link";

const Home = ()=>{
  const {mainPosts} = useSelector(state => state.post);
  const menuItems = [
    {
      key: 'home',
      label: <Link href="/">홈</Link>,
    },
  ];

  return (<AppLayout items={menuItems}>
    <PostForm/>
    {mainPosts.map((c) => {
      return (
      <PostCard post={c} key={c.id}/>
      );})
    }
  </AppLayout>);
=======
import Notification from "../components/Notification";
import Profile from '../components/Profile'
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";

const Home = () => {
  return (
    <AppLayout>
      <>
        <Profile />
      </>
    </AppLayout>
  );
>>>>>>> fa4b5d9f4792afd91842fd14171d2d4b9982d2e5
}

export default Home;