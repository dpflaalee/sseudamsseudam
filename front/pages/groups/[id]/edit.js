import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Card, message, Spin } from 'antd';
import AppLayout from '@/components/AppLayout';
import GroupForm from '@/components/groups/GroupForm';

const { Title } = Typography;

const EditGroupPage = () => {
  const router = useRouter();
  const { id } = router.query || {id:'42'}; //테스트용. 추후 삭제

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null);

  // 그룹 정보 불러오기
  useEffect(() => {
    if (!id) return;

    //실제 API 요청으로 대체해야 함
    const fetchGroupData = async () => {
      setLoading(true);
      try {
        const response = {
          title: '고양이 집사 모임',
          categories: ['고양이'],
          description: '고양이 사랑하는 사람들끼리 모입시다.',
          isPrivate: true,
        };
        setInitialValues(response);
      } catch (error) {
        message.error('그룹 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [id]);

  // 수정완료
  const handleEdit = (values) => {
    console.log('그룹 수정 값:', values);
    message.success('그룹이 수정되었습니다!');
    router.push('/groups');
  };

  return (
    <AppLayout>
      <Card style={{ border: 'none' }}>
        <Title level={3}>그룹 수정</Title>
        {loading ? (
          <Spin />
        ) : (
          <GroupForm mode="edit" initialValues={initialValues} onFinish={handleEdit} />
        )}
      </Card>
    </AppLayout>
  );
};

export default EditGroupPage;
