import React, { useState } from 'react';
import { Card, Row, Col, Button, Input, Typography } from 'antd';
import AppLayout from '@/components/AppLayout';
import PrizeForm from '@/components/prize/PrizeForm';
import PrizeList from '@/components/prize/PrizeList';

const { Title, Text } = Typography;

const categoryData = [
  { id: 1, name: '강아지' },
  { id: 2, name: '고양이' },
];

const PrizeManage = () => {
  const [prizes, setPrizes] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);

  const handleAddClick = () => {
    setEditingPrize(null);
    setFormVisible(true);
  };

  const handleSubmit = (prize) => {
    setPrizes(prev => {
      const existingIndex = prev.findIndex(p => p.id === prize.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = prize;
        return updated;
      }
      return [...prev, prize];
    });
    setFormVisible(false);
  };

  const handleDelete = (id) => {
    setPrizes(prev => prev.filter(p => p.id !== id));
  };

  const handleEdit = (prize) => {
    setEditingPrize(prize);
    setFormVisible(true);
  };

  return (
    <AppLayout>
      {/* 상단 프로필 카드 */}
            <Card style={{ background: '#e6f7ff', marginBottom: 24 }}>
              <Row align="middle" gutter={16}>
                <Col>
                  <div style={{
                    width: 80, height: 80,
                    borderRadius: '50%', backgroundColor: '#ccc'
                  }} />
                </Col>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>관리자</Title>
                  <Text>30일팔로잉 | 22팔로워 | 123개게시물</Text>
                  <div style={{ marginTop: 8 }}>
                    <Button size="small" style={{ marginRight: 8 }}>카테고리 관리</Button>
                    <Button size="small" style={{ marginRight: 8 }}>일정 관리</Button>
                    <Button size="small" style={{ marginRight: 8 }}>챌린지 현황</Button>
                    <Button size="small" type="primary">상품 관리</Button>
                  </div>
                </Col>
              </Row>
            </Card>

      <Card style={{ marginBottom: 24 }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={4}>상품 관리</Title>
          </Col>
          <Col>
            <Button type="primary" onClick={handleAddClick}>+ 상품 추가</Button>
          </Col>
        </Row>
      </Card>

      <PrizeList
        prizes={prizes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categoryData}
      />

      <PrizeForm
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        onSubmit={handleSubmit}
        editingPrize={editingPrize}
        categories={categoryData}
      />
    </AppLayout>
  );
};

export default PrizeManage;

/* 상품 관리페이지 */
