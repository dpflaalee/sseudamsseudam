import React from 'react';
import { Card, Button, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';

// 더미 타입 상수
const TARGET_TYPE = {
    POST: 'POST',
    COMMENT: 'COMMENT',
    USER: 'USER',
};

const ComplainCard = ({ report = {} }) => {
    const {
        type = TARGET_TYPE.COMMENT,
        targetId = 1,
        reporter = '신고자 닉네임',
        reportedUser = '신고당한 유저',
        content = '신고 사유 내용입니다.',
        createdAt = '2025-05-29 10:00',
    } = report;

    const handleDelete = () => {
        alert('신고 내역을 삭제합니다 (DB 연동은 아직 안 됨)');
    };

    const renderByType = () => {
        switch (type) {
            case TARGET_TYPE.POST:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{reporter}님이 게시글을 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#f9f9f9', marginTop: 8 }}>게시글 미리보기 (ID: {targetId})</div>
                    </>
                );

            case TARGET_TYPE.COMMENT:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{reporter}님이 댓글을 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#f0f0f0', marginTop: 8 }}>댓글 미리보기 (ID: {targetId})</div>
                    </>
                );

            case TARGET_TYPE.USER:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{reporter}님이 유저 {reportedUser}를 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#fff7e6', marginTop: 8 }}>유저 미리보기 (ID: {targetId})</div>
                    </>
                );

            default:
                return <div>알 수 없는 신고 유형입니다.</div>;
        }
    };

    return (
        <Card
            style={{ marginBottom: 24 }}
            title={<span style={{ color: '#888' }}>{createdAt}</span>}
            extra={
                <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
                    내용 삭제하기
                </Button>
            }
        >
            {renderByType()}
            <div style={{ marginTop: 10 }}>{content}</div>
        </Card>
    );
};

export default ComplainCard;
