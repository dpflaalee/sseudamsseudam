import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import AppLayout from "../../components/AppLayout";
import PrizeManage from '@/components/prize/PrizeManage';
import 'antd/dist/antd.css';

import { useSelector } from "react-redux";

import ComplainCard from "@/components/complains/ComplainCard";
import PostCard from "../../components/post/PostCard";

const { Title, Text } = Typography;

const adminPage = () => {
    const [activeSection, setActiveSection] = useState(null); 
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
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
            <Text>30일팔로잉 | 22팔로워 | 123개게시물</Text>
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
      {/* 다른 섹션도 여기에 조건부로 추가 가능 */}
            {mainPosts.map((c) => {
                return (
                    <PostCard post={c} key={c.id} />
                );
            })}
        </AppLayout>);
}

export default adminPage;