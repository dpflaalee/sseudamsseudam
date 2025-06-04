<<<<<<< HEAD
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from "antd";
import PostCard from '@/components/post/PostCard';
import PostForm from '@/components/post/PostForm';
import Comment from '@/components/comment/Comment';
import Profile from '@/components/Profile';
import NotificationButton from "@/components/notifications/NotificationButton";
import { LOAD_POSTS_REQUEST } from '../reducers/post';
//// import 수정
const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
  const { mainComplainCard } = useSelector((state) => state.complain);
=======
import React from "react";
import LoginForm from "../components/user/LoginForm";
import AppLayout from "../components/AppLayout";
const login = () => {
    return (
        <AppLayout>
            <LoginForm />
        </AppLayout>
    );
};
>>>>>>> 33e65021a24d4170d4296c8cbb1a2c494f4c6036

export default login;