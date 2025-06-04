import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Space, Form, Input, Select, Checkbox, Button, Typography, Card, message, } from 'antd';

const { Title } = Typography; const { TextArea } = Input; const { Option } = Select;

//더미카테고리
const categoryOptions = ['강아지', '고양이', '햄스터', '도마뱀', '뱀', '다묘', '다견'];

const GroupForm = ({ initialValues = {}, onFinish, mode = 'create' }) => { const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ title: '', categories: [], description: '', isPrivate: false,  ...initialValues, }}
    >
      <Form.Item
        label="그룹명"
        name="title"
        rules={[{ required: true, message: '그룹명을 입력해주세요.' }]}
      >
        <Input placeholder="예: 러닝 메이트" />
      </Form.Item>

      <Form.Item
        label="카테고리"
        name="categories"
        rules={[{ required: true, message: '카테고리를 하나 이상 선택해주세요.' }]}
      >
        <Select mode="multiple" placeholder="카테고리를 선택하세요">
          {categoryOptions.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="소개 및 규칙"
        name="description"
        rules={[{ required: true, message: '소개 및 규칙을 입력해주세요.' }]}
      >
        <TextArea rows={5} placeholder="그룹 소개 및 규칙을 입력하세요" />
      </Form.Item>

      <Form.Item name="isPrivate" valuePropName="checked">
        <Checkbox>비공개 그룹으로 설정</Checkbox>
      </Form.Item>

      <Form.Item>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => router.back()}>취소</Button>
          <Button type="primary" htmlType="submit">
            {mode === 'edit' ? '그룹 수정' : '그룹 생성'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default GroupForm;
