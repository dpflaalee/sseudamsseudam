import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPrize,
  modifyPrize,
  removePrize,
  loadPrizes,
} from '@/reducers/prize';
import PrizeForm from '@/components/prize/PrizeForm';
import PrizeList from '@/components/prize/PrizeList';

const { Title } = Typography;

const categoryData = [
  { id: 1, content: '강아지' },
  { id: 2, content: '고양이' },
];

const PrizeManage = () => {
  const dispatch = useDispatch();

  // Redux state
  const { prizes, addPrizeDone, modifyPrizeDone, removePrizeDone } = useSelector(
    (state) => state.prize
  );

  const [formVisible, setFormVisible] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);

  useEffect(() => {
    dispatch(loadPrizes());
  }, [dispatch]);

  // 상품 추가/수정 후 모달 닫기
  useEffect(() => {
    if (addPrizeDone || modifyPrizeDone) {
      setFormVisible(false);
    }
  }, [addPrizeDone, modifyPrizeDone]);

  const handleAddClick = () => {
    setEditingPrize(null);
    setFormVisible(true);
  };

  const handleSubmit = (prize) => {
    if (editingPrize) {
      dispatch(modifyPrize(prize));
    } else {
      dispatch(addPrize(prize));
    }
  };

  const handleDelete = (id) => {
    dispatch(removePrize(id));
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
            <Button type="primary" onClick={handleAddClick}>
              + 상품 추가
            </Button>
          </Col>
        </Row>
      </Card>

      <PrizeList
        prizes={prizes}
        categories={categoryData}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
