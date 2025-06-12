import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import AppLayout from "@/components/AppLayout";
import PrizeManage from '@/components/prize/PrizeManage';
import 'antd/dist/antd.css';

import { useSelector } from "react-redux";

import ComplainCard from "@/components/complains/ComplainCard";
import PostCard from "@/components/post/PostCard";
import CategoryManage from "@/components/category/CategoryManage"
import EventScheduleManage from '@/components/Calendar/EventSchedule/EventScheduleManage';
import EventScheduleForm from '@/components/Calendar/EventSchedule/EventScheduleForm';
import EventScheduleList from '@/components/Calendar/EventSchedule/EventScheduleList';
import ChallengeList from '@/components/Calendar/Todolist/ChallengeList';

const { Title, Text } = Typography;

const manage = () => {
    const [activeSection, setActiveSection] = useState(null);
    return (
        <AppLayout>
            {/* 상단 프로필 카드 */}
            <Card style={{ background: '#e6f7ff', marginBottom: 24 }}>
                <Row align="middle" gutter={16}>
                    <Col>
                        <div
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                backgroundColor: '#ccc',
                            }}
                        />
                    </Col>
                    <Col>
                        <Title level={4} style={{ margin: 0 }}>관리자</Title>
                        <Text></Text>
                        <div style={{ marginTop: 8 }}>
                            <Button
                                size="small"
                                style={{ marginRight: 8 }}
                                onClick={() => setActiveSection('category')}>카테고리 관리</Button>
                            <Button
                                size="small"
                                style={{ marginRight: 8 }}
                                onClick={() => setActiveSection('schedule')}>일정 관리</Button>
                            <Button
                                size="small"
                                style={{ marginRight: 8 }}
                                onClick={() => setActiveSection('challenge')}>챌린지 현황</Button>
                            <Button
                                size="small"
                                type="primary"
                                onClick={() => setActiveSection('prize')}>상품 관리</Button>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* 조건부로 보여줄 컴포넌트들 */}
            {activeSection === 'prize' && <PrizeManage />}
            {activeSection === 'category' && <CategoryManage />}
            {activeSection === 'schedule' && <EventScheduleList />}
            {activeSection === 'challenge' && <ChallengeList />}
            {/* 다른 섹션도 여기에 조건부로 추가 가능 */}
        </AppLayout>);
}

export default manage;