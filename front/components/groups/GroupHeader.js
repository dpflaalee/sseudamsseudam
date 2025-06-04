import React from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';

const { TabPane } = Tabs;

const GroupHeader = ({ groupId }) => {
  const router = useRouter();
  const { tab } = router.query;
  const isLeader = true; // 추후 방장 여부 로직으로 대체

   const tabKey = tab || 'info'; // 기본값

  const handleTabChange = (key) => {
    router.push({
      pathname: `/groups/${groupId}`,
      query: { tab: key },
    });
  };

  return (
    <Tabs activeKey={tabKey} onChange={handleTabChange} style={{alignItems:'center'}}>
      <TabPane tab="그룹 소개" key="info" />
      <TabPane tab="멤버 리스트" key="members"> </TabPane>
      {isLeader && ( <TabPane tab="가입 승인" key="requests" /> )}
    </Tabs>
  );
};

export default GroupHeader;
