import React, { useState } from 'react';
import { Modal, Input, Select, List, Avatar, Button, Spin, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_PROFILES_REQUEST } from '@/reducers/animal';

const { Option } = Select;

const AnimalSearch = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { searchResults, searchProfilesLoading } = useSelector((state) => state.animal);

  const categoryOptions = [
    { id: 1, name: '강아지' },
    { id: 2, name: '고양이' },
    { id: 3, name: '햄스터' },
    { id: 4, name: '파충류' },
  ];

  const [form, setForm] = useState({
    aniName: '',
    categoryId: '',
  });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onChangeCategory = (value) => {
    setForm((prev) => ({ ...prev, categoryId: value }));
  };

  const handleSearch = () => {
    dispatch({
      type: SEARCH_PROFILES_REQUEST,
      data: {
        name: form.aniName,
        categoryId: form.categoryId,
      },
    });
  };
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title="친구 찾기"
      footer={null}
      width={420}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Select
          placeholder="카테고리 선택"
          onChange={onChangeCategory}
          value={form.categoryId || undefined}
        >
          {categoryOptions.map((option) => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))}
        </Select>

        <Input
          name="aniName"
          placeholder="이름 검색"
          value={form.aniName}
          onChange={onChange}
        />

        <Button type="primary" onClick={handleSearch} loading={searchProfilesLoading}>
          검색
        </Button>
      </div>

      <div style={{ marginTop: 24 }}>
        {searchProfilesLoading ? (
          <Spin />
        ) : (
          <List
            dataSource={searchResults}
            locale={{ emptyText: <Empty description="검색 결과 없음" /> }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`http://localhost:3065/uploads/animalProfile/${item.aniProfile}`}
                    />
                  }
                  title={item.aniName}
                  description={`${item.Category?.content} · ${item.aniAge}살`}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </Modal>
  );
};

export default AnimalSearch;
