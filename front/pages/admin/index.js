import React from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';

import { useSelector } from "react-redux";

import ComplainCard from "@/components/complains/ComplainCard";
import PostCard from "../../components/post/PostCard";
import AdminProfile from "@/components/AdminProfile";

const adminPage = () => {
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
    return (
        <AppLayout>
            <>
                <AdminProfile />
                {mainPosts.map((c) => {
                    return (
                        <PostCard post={c} key={c.id} />
                    );
                })}
            </>
        </AppLayout>);
}

export default adminPage;