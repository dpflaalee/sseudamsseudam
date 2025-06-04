import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Card, message, } from 'antd';
import AppLayout from '@/components/AppLayout';
import GroupForm from '@/components/groups/GroupForm';

const { Title } = Typography;

const CreateGroupPage = () => {
  const router = useRouter();

  const handleCreate = (values) => {
    console.log('그룹 생성 값:', values);
    message.success('그룹이 생성되었습니다!');
    router.push('/groups');
  };

  return (
    <AppLayout>
      <Card style={{ border:"none" }}>
        <Title level={3}>그룹 생성</Title>
        <GroupForm mode="create" onFinish={handleCreate} />
      </Card>
    </AppLayout>
  );
};

export default CreateGroupPage;
