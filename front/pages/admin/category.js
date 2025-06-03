// pages/admin/categories.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Modal, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AppLayout from '@/components/AppLayout';

const { Option } = Select;

const dummyData = [
  { id: 1, content: '강아지', largeCategory: 'ANIMAL' },
  { id: 2, content: '고양이', largeCategory: 'ANIMAL' },
  { id: 3, content: '산책챌린지', largeCategory: 'CHALLENGE' },
];

const CategoryAdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [newLargeCategory, setNewLargeCategory] = useState('ANIMAL');

  useEffect(() => { setCategories(dummyData); }, []);

  const handleAdd = () => {
    setEditCategory(null);
    setNewContent('');
    setNewLargeCategory('ANIMAL');
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditCategory(record);
    setNewContent(record.content);
    setNewLargeCategory(record.largeCategory);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '정말 삭제하시겠습니까?',
      onOk: () => {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        message.success('삭제되었습니다.');
      },
    });
  };

  const handleSave = () => {
    if (!newContent.trim()) { message.warning('카테고리 이름을 입력해주세요.'); return; }

    if (editCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editCategory.id
            ? { ...cat, content: newContent, largeCategory: newLargeCategory }
            : cat
        )
      );
      message.success('수정되었습니다.');
    } else {
      const newId = categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
      setCategories((prev) => [
        ...prev,
        { id: newId, content: newContent, largeCategory: newLargeCategory },
      ]);
      message.success('추가되었습니다.');
    }

    setIsModalVisible(false);
  };

  const columns = [
    {
      title: '카테고리 이름',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '분류',
      dataIndex: 'largeCategory',
      key: 'largeCategory',
      render: (text) => (text === 'ANIMAL' ? '동물' : '챌린지'),
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space style={{ justifyContent: 'flex-end', display: 'flex' }}>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            수정
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (<AppLayout>
    <div style={{ padding: 24 }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16, width:"100%" }} >
        카테고리 추가
      </Button>

      <Table rowKey="id" dataSource={categories} columns={columns} pagination={false} />

      <Modal
        title={editCategory ? '카테고리 수정' : '카테고리 추가'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        okText="저장"
        cancelText="취소"
      >
        <Input
          placeholder="카테고리 이름"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Select
          value={newLargeCategory}
          onChange={(value) => setNewLargeCategory(value)}
          style={{ width: '100%' }}
        >
          <Option value="ANIMAL">동물</Option>
          <Option value="CHALLENGE">챌린지</Option>
        </Select>
      </Modal>
    </div>
  </AppLayout>);
};

export default CategoryAdminPage;