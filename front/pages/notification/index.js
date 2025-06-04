import React, { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import 'antd/dist/antd.css';

import NotificationButton from "@/components/notifications/NotificationButton";
import Notification from "@/components/notifications/Notification";

import { LOAD_NOTIFICATION_REQUEST } from "@/reducers/notification";


const NotificationPage = () => {
    const dispatch = useDispatch();
    const { mainNotification, loadNotificationLoading } = useSelector(
        (state) => state.notification
    );
    const userId = useSelector((state) => state.user.user?.id); // 로그인한 유저 ID

    useEffect(() => {
        if (userId) {
            dispatch({
                type: LOAD_NOTIFICATION_REQUEST,
                data: userId,
            });
        }
    }, [userId]);

    return (
        <AppLayout>
            <>
                <NotificationButton />
                {mainNotification?.map((c) => {
                    return (
                        <Notification noti={c} key={c.id} />
                    );
                })}

            </>
        </AppLayout >
    );
}

export default NotificationPage;
