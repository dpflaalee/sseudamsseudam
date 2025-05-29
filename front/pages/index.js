import React from "react";
import AppLayout from "../components/AppLayout";
import 'antd/dist/antd.css';
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
}

export default Home;