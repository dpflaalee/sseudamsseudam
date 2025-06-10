import React, { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import 'antd/dist/antd.css';
import { Tabs, Button } from 'antd';
import groupBy from 'lodash/groupBy';
import { useRouter } from 'next/router';

import NotificationButton from "@/components/notifications/NotificationButton";
import Notification from "@/components/notifications/Notification";

import {
    LOAD_NOTIFICATION_REQUEST,
    READ_ALL_NOTIFICATION_REQUEST,
    REMOVE_NOTIFICATION_REQUEST,
} from "@/reducers/notification";

import NOTIFICATION_TYPE from "../../../shared/constants/NOTIFICATION_TYPE";

const { TabPane } = Tabs;

const typeLabels = {
    [NOTIFICATION_TYPE.LIKE]: '❤️ 좋아요',
    [NOTIFICATION_TYPE.RETWEET]: '🔁 리트윗',
    [NOTIFICATION_TYPE.COMMENT]: '💬 댓글',
    [NOTIFICATION_TYPE.FOLLOW]: '➕ 팔로우',
    [NOTIFICATION_TYPE.RECOMMENT]: '💬 답글',
    [NOTIFICATION_TYPE.RANDOMBOX]: '🎁 랜덤박스',
    [NOTIFICATION_TYPE.GROUPAPPLY]: '👥 그룹 신청',
    [NOTIFICATION_TYPE.GROUPAPPLY_APPROVE]: '✅ 가입 승인',
    [NOTIFICATION_TYPE.GROUPAPPLY_REJECT]: '❌ 가입 거절',
    [NOTIFICATION_TYPE.ADMIN_NOTI]: '📢 관리자 알림',
    [NOTIFICATION_TYPE.ANIMAL_FRIENDS]: '👑 친구 요청',
};

const NotificationPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { mainNotification } = useSelector((state) => state.notification);
    const userId = useSelector((state) => state.user.user?.id);
    const grouped = groupBy(mainNotification, 'type');

    useEffect(() => {
        if (userId) {
            dispatch({
                type: LOAD_NOTIFICATION_REQUEST,
                data: userId,
            });

            dispatch({
                type: READ_ALL_NOTIFICATION_REQUEST,
                data: userId,
            });

            axios.patch('/notification/readAll', {
                userId: userId,
            }).then(() => {
            }).catch((err) => {
                console.error('🚨 전체 읽음 처리 실패:', err);
            });
        }
    }, [userId]);

    const handleDelete = (id) => {
        dispatch({
            type: REMOVE_NOTIFICATION_REQUEST,
            data: id,
        });
    };

    const goToSettingPage = () => {
        router.push('/mypage/notificationSetting');
    };

    return (
        <AppLayout>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16
            }}>
                <h2 style={{ margin: 0 }}></h2>
                <Button onClick={goToSettingPage} type="default" size="middle">
                    ⚙ 알림 설정
                </Button>
            </div>
            <Tabs defaultActiveKey="all">
                <TabPane tab="📬 전체" key="all">
                    {mainNotification.map((noti) => (
                        <Notification key={noti.id} noti={noti} onDelete={handleDelete} />
                    ))}
                </TabPane>

                {Object.entries(typeLabels).map(([type, label]) => (
                    <TabPane tab={label} key={type}>
                        {(grouped[type] || []).map((noti) => (
                            <Notification key={noti.id} noti={noti} onDelete={handleDelete} />
                        ))}
                    </TabPane>
                ))}
            </Tabs>
        </AppLayout>
    );
};

export default NotificationPage;
