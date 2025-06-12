import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined, QqOutlined } from '@ant-design/icons';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';

import { useDispatch } from 'react-redux';

import DummyComment from './DummyComment';
import ComplainPost from './ComplainPost';
import Comment from '../comment/Comment';
import Profile from '../user/Profile';
import ComplainProfile from './ComplainProfile';
import { IS_BLIND_REQUEST } from '@/reducers/complain';

const ComplainCard = ({ report }) => {
    const dispatch = useDispatch();
    const isBlind = () => {
        //alert('신고 내역을 삭제합니다');
        dispatch({
            type: IS_BLIND_REQUEST,
            data: {
                targetId: report.targetId
            }
        });
    };

    const reporter = report.Reporter;
    const targetObject = report.targetObject;
    const isBlinded = report.isBlind;

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
                                <ComplainPost post={targetObject} />
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
                        <div style={{ padding: '8px', backgroundColor: '#fff7e6', marginTop: 8 }}>{targetObject && <ComplainProfile postUserId={targetObject.id} />}</div>
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
            extra=
            {isBlinded ?
                <Button icon={<QqOutlined />} > 처리 완료됨 </Button>
                :
                <Button danger icon={<DeleteOutlined />} onClick={isBlind}> 내용 삭제하기 </Button>
            }

        >
            {renderByType()}
            < div style={{ marginTop: 10 }}> {report.reason}</div >
        </Card >
    );
};

export default ComplainCard;
