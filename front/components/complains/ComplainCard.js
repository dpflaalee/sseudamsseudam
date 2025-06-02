import React from 'react';
import { Card, Button, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
import Comment from '../Comment/Comment';

const ComplainCard = ({ report }) => {
    console.log('💫 ComplainCard : report ', report);
    const handleDelete = () => {
        alert('신고 내역을 삭제합니다 (DB 연동은 아직 안 됨)');
    };

    const renderByType = () => {
        switch (report.targetType) {
            case TARGET_TYPE.POST:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{report.reporter.nickname}님이 게시글을 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#f9f9f9', marginTop: 8 }}>게시글 미리보기 (ID: {report.targetId})</div>
                    </>
                );

            case TARGET_TYPE.COMMENT:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{report.reporter.nickname}님이 댓글을 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#f0f0f0', marginTop: 8 }}> <Comment /> (ID: {report.targetId})</div>
                    </>
                );

            case TARGET_TYPE.USER:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{report.reporter.nickname}님이 {report.targetId}를 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#fff7e6', marginTop: 8 }}>유저 미리보기 (ID: {report.targetId})</div>
                    </>
                );

            default:
                return <div>알 수 없는 신고 유형입니다.</div>;
        }
    };

    return (
        <Card
            style={{ marginBottom: 24 }}
            title={<span style={{ color: '#888' }}>
                {/* {createdAt} */}
                날짜
            </span>}
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
