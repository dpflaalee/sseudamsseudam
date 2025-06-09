import React, { useState } from 'react';
import { Card, Row, Col, Button, Input, Typography } from 'antd';
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
    <>
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
    </>
  );
};

export default PrizeManage;

/* 상품 관리페이지 */
