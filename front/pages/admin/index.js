import React from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';

import ComplainCard from "../../components/complains/ComplainCard";
import PostCard from "../../components/PostCard";

const adminPage = () => {
    return (
        <AppLayout>
            <>
                <PostCard />
            </>

        </AppLayout>);
}

export default adminPage;