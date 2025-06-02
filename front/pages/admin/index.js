import React from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';

import PostCard from "../../components/Post/PostCard";

const adminPage = () => {
    return (
        <AppLayout>
            <>
                <PostCard />
            </>

        </AppLayout>);
}

export default adminPage;