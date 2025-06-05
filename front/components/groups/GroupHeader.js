import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const GroupHeader = ({ activeTab, setActiveTab, isLeader }) => {

  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{alignItems:'center'}}>
      <TabPane tab="그룹 소개" key="timeline" />
      <TabPane tab="멤버 리스트" key="members"> </TabPane>
      {isLeader && ( <TabPane tab="가입 승인" key="joinRequests" /> )}
    </Tabs>
  );
};

export default GroupHeader;
