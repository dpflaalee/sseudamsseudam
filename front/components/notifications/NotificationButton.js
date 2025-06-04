import React, { useState } from 'react';
import Notification from './Notification';
import NOTIFICATION_TYPE from '../../../shared/constants/NOTIFICATION_TYPE';

const NotificationButton = () => {
    const [notifications, setNotifications] = useState([]);

    const dummyUser = {
        nickname: '테스트 사용자',
        avatar: 'https://example.com/avatar.jpg',
    };

    // 알림 타입별로 버튼 클릭 시 해당 알림을 추가하는 함수
    const handleNotificationClick = (type) => {
        const newNotification = {
            type,
            user: dummyUser,
            target: {}, // 알림에 필요한 target 데이터를 여기에 넣으면 됩니다.
            content: '더미 알림 내용', // 더미 데이터를 넣습니다.
        };

        setNotifications((prevNotifications) => [
            ...prevNotifications,
            newNotification,
        ]);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.LIKE)}>
                    좋아요 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.RETWEET)}>
                    리트윗 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.COMMENT)}>
                    댓글 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.FOLLOW)}>
                    팔로우 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.REPLY)}>
                    답글 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.RANDOMBOX)}>
                    랜덤박스 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.GROUPAPPLY)}>
                    그룹 신청 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.GROUPAPPLY_APPROVE)}>
                    그룹 승인 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.GROUPAPPLY_REJECT)}>
                    그룹 거절 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.ADMIN_NOTI)}>
                    관리자 알림
                </button>
                <button onClick={() => handleNotificationClick(NOTIFICATION_TYPE.ANIMAL_FRIENDS)}>
                    동물친구 알림
                </button>
            </div>

            <div>
                {notifications.map((noti, index) => (
                    <Notification
                        key={index}
                        type={noti.type}
                        user={noti.user}
                        target={noti.target}
                        content={noti.content}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationButton;
