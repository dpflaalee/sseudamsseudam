import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';


import DummyComment from './DummyComment';
import DummyPost from './DummyPost';
import DummyUser from './DummyUser';

import PostCard from '../post/PostCard';
import Comment from '../comment/Comment';

const ComplainCard = ({ report }) => {
    console.log('🐕‍🦺 ComplainCard : ', report);

    const handleDelete = () => {
        alert('신고 내역을 삭제합니다');
    };
    const reporter = report.Reporter;
    console.log('💤 reporter ', reporter);
    const [targetObject, setTargetObject] = useState(null);

    useEffect(() => {
        const fetchTargetData = async () => {
            let url = '';
            switch (report.targetType) {
                case TARGET_TYPE.POST:
                    url = `/complain/post/${report.targetId}`;
                    break;
                case TARGET_TYPE.COMMENT:
                    url = `/complain/comment/${report.targetId}`;
                    break;
                case TARGET_TYPE.USER:
                    url = `/complain/user/${report.targetId}`;
                    break;
            }

            try {
                const response = await axios.get(url);
                console.log('📦 받아온 데이터:', response.data);
                setTargetObject(response.data);
            } catch (error) {
                console.error(`🚨 대상 불러오기 실패 (${report.targetType}):`, error);
            }
        };
        fetchTargetData();
    }, [report]);


    const renderByType = () => {
        if (!targetObject) {
            return <div>불러오는 중입니다...</div>; // 또는 return null;
        }
        switch (report.targetType) {
            case TARGET_TYPE.POST:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>
                            {reporter ? reporter.nickname : '알수 없음'}님이 게시글을 신고했습니다.
                        </div>
                        {targetObject ? (
                            <div style={{ padding: '8px', backgroundColor: '#f9f9f9', marginTop: 8 }}>
                                <PostCard post={targetObject} />
                            </div>
                        ) : (
                            <div>게시글 정보를 불러오는 중입니다...</div>
                        )}
                    </>
                );

            case TARGET_TYPE.COMMENT:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{reporter ? reporter.nickname : '알수 없음'}님이 댓글을 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#f0f0f0', marginTop: 8 }}>{targetObject && <DummyComment comment={targetObject} />} </div>
                    </>
                );

            case TARGET_TYPE.USER:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{reporter ? reporter.nickname : '알수 없음'}님이 유저 {report.targetId}를 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#fff7e6', marginTop: 8 }}>{targetObject && <DummyUser post={targetObject} />}</div>
                    </>
                );

            default:
                return <div>알 수 없는 신고 유형입니다.</div>;
        }
    };

    return (
        <Card
            style={{ marginBottom: 24 }}
            title={<span style={{ color: '#888' }}>{report.createdAt}</span>}
            extra={
                <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
                    내용 삭제하기
                </Button>
            }
        >
            {renderByType()}
            <div style={{ marginTop: 10 }}>{report.reason}</div>
        </Card>
    );
};

export default ComplainCard;
