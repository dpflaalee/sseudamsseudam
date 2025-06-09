/* 

사용 안하는 페이지 - 일단 주석처리함


import React, { useState } from 'react';
import { Card, Row, Col, Button, Input, Typography, Calendar, Space } from 'antd';
import AppLayout from '@/components/AppLayout';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledInput = styled(Input)`
  margin-bottom: 8px;
`;

const RandomBoxManage = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, name: '강아지 랜덤박스', date: '2025/05/30', editing: false },
    { id: 2, name: '고양이 랜덤박스', date: '2025/06/01', editing: false },
  ]);

  const [newBox, setNewBox] = useState({ name: '', date: '' });

  const handleAddBox = () => {
    if (!newBox.name || !newBox.date) return;
    const newEntry = {
      id: Date.now(),
      name: newBox.name,
      date: newBox.date,
      editing: false,
    };
    setBoxes(prev => [...prev, newEntry]);
    setNewBox({ name: '', date: '' });
  };

  const handleDelete = (id) => {
    setBoxes(prev => prev.filter(box => box.id !== id));
  };

  const handleEdit = (id) => {
    setBoxes(prev =>
      prev.map(box => (box.id === id ? { ...box, editing: true } : box))
    );
  };

  const handleSave = (id, updatedBox) => {
    setBoxes(prev =>
      prev.map(box => (box.id === id ? { ...updatedBox, editing: false } : box))
    );
  };

  const handleCancelEdit = (id) => {
    setBoxes(prev =>
      prev.map(box => (box.id === id ? { ...box, editing: false } : box))
    );
  };

  const rightSidebar = (
    <>
      <Card title="5월 일정" style={{ marginBottom: 16 }}>
        <p><strong>대문 꾸미기</strong><br />5월 10일 ~ 5월 11일</p>
        <p><strong>바우처 등록</strong><br />5월 13일 ~ 5월 13일</p>
        <p><strong>참여자 발표</strong><br />5월 15일</p>
        <p style={{ color: 'red' }}><strong>[EVENT]</strong> 박스추가<br />5월 10일 ~ 5월 17일</p>
        <a href="#">일정 더 알아보기 &gt;</a>
      </Card>
      <Card title="챌린지 참여 현황">
        <Calendar fullscreen={false} />
      </Card>
    </>
  );

  return (
    <AppLayout >
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
              <Button size="small" type="primary">랜덤박스 관리</Button>
            </div>
          </Col>
        </Row>
      </Card>


      <Card title="랜덤박스 상품 추가" style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={8}>
            <StyledInput
              placeholder="상품명"
              value={newBox.name}
              onChange={e => setNewBox({ ...newBox, name: e.target.value })}
            />
          </Col>
          <Col span={8}>
            <StyledInput
              placeholder="유효기간 (예: 2025/06/01)"
              value={newBox.date}
              onChange={e => setNewBox({ ...newBox, date: e.target.value })}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBox}>추가</Button>
          </Col>
        </Row>
      </Card>


      <Card title="등록된 랜덤박스 리스트">
        <Row gutter={[0, 16]}>
          {boxes.map(box => (
            <Col span={24} key={box.id}>
              <Card
                type="inner"
                title={box.editing ? (
                  <>
                    <Input
                      value={box.name}
                      onChange={e =>
                        setBoxes(prev => prev.map(b => b.id === box.id ? { ...b, name: e.target.value } : b))
                      }
                      style={{ marginBottom: 8 }}
                    />
                    <Input
                      value={box.date}
                      onChange={e =>
                        setBoxes(prev => prev.map(b => b.id === box.id ? { ...b, date: e.target.value } : b))
                      }
                    />
                  </>
                ) : box.name}
                extra={
                  box.editing ? (
                    <Space>
                      <Button
                        icon={<SaveOutlined />}
                        size="small"
                        onClick={() => handleSave(box.id, box)}
                      />
                      <Button
                        icon={<CloseOutlined />}
                        size="small"
                        onClick={() => handleCancelEdit(box.id)}
                      />
                    </Space>
                  ) : (
                    <Space>
                      <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(box.id)}
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        onClick={() => handleDelete(box.id)}
                      />
                    </Space>
                  )
                }
              >
                {!box.editing && <p>유효기간: {box.date}</p>}
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </AppLayout>
  );
};


export default RandomBoxManage;

*/


/* 랜덤박스 관리페이지 
   사용안하는 페이지 주석처리
*/
