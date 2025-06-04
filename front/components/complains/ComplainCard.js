import React from 'react';
import { Card, Button, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
import DummyComment from './DummyComment';
import DummyPost from './DummyPost';
import DummyUser from './DummyUser';

const ComplainCard = ({ report }) => {
    console.log('🐕‍🦺 ComplainCard : ', report);

    const handleDelete = () => {
        alert('신고 내역을 삭제합니다');
    };
    const reporter = report.repoterId;
    console.log(reporter);

    const renderByType = () => {
        switch (report.targetType) {
            case TARGET_TYPE.POST:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{reporter ? report.reporterId.nickname : '알수 없음'}님이 게시글을 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#f9f9f9', marginTop: 8 }}> <DummyPost data={report.targetId} /></div>
                    </>
                );

            case TARGET_TYPE.COMMENT:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{reporter ? report.reporterId.nickname : '알수 없음'}님이 댓글을 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#f0f0f0', marginTop: 8 }}> <DummyComment data={report.targetId} /></div>
                    </>
                );

            case TARGET_TYPE.USER:
                return (
                    <>
                        <div style={{ fontWeight: 'bold' }}>{reporter ? report.reporterId.nickname : '알수 없음'}님이 유저 {report.targetId}를 신고했습니다.</div>
                        <div style={{ padding: '8px', backgroundColor: '#fff7e6', marginTop: 8 }}> <DummyUser data={report.targetId} /></div>
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
