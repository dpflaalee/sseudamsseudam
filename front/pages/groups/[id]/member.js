import React from 'react';
import AppLayout from '@/components/AppLayout';
import GroupMember from '@/components/groups/GroupMember';

const GroupMembersPage = () => {
  const isLeader = true; // 방장 테스트용

  return (
    <AppLayout>
      <h1 style={{ margin: '16px 0' }}>멤버 리스트</h1>
      <GroupMember isLeader={isLeader} />
    </AppLayout>
  );
};

export default GroupMembersPage;
