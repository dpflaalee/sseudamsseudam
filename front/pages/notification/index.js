import React, { useState } from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';
import NotificationButton from "@/components/notifications/NotificationButton";

const Notification = () => {


    return (
        <AppLayout>
            <>
                <NotificationButton />

            </>
        </AppLayout >
    );
}

export default Notification;
