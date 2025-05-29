import React from "react";
import AppLayout from "../components/AppLayout";
import 'antd/dist/antd.css';

import ComplainCard from "../components/ComplainCard";

const adminPage = () => {
    return (
        <AppLayout>
            <>
                <ComplainCard />
            </>

        </AppLayout>);
}

export default adminPage;