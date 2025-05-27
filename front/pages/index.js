import React from "react";
import AppLayout from "../components/AppLayout";
import 'antd/dist/antd.css';
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = ()=>{
  return (<AppLayout>
    <PostForm/>
    <PostCard/>
  </AppLayout>);
}

export default Home;