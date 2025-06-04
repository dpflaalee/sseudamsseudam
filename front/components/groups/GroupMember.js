import React from 'react';
import { Avatar, Button, List, Popover, Space, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Text } = Typography;

const dummyMembers = [
  {
    id: 1,
    nickname: '철수',
    isLeader: true,
    isFollowing: true,
    avatar: null,
  },
  {
    id: 2,
    nickname: '영희',
    isLeader: false,
    isFollowing: false,
    avatar: null,
  },
  {
    id: 3,
    nickname: '민수',
    isLeader: false,
    isFollowing: true,
    avatar: null,
  },
];

const GroupMember = ({ isLeader }) => {
  const renderActions = (member) => {
    if (isLeader) {
      return (
        <>
          <Button type="text">차단하기</Button>
          {!member.isLeader && <Button type="text">방장 권한 주기</Button>}
          {!member.isLeader && <Button type="text">강퇴시키기</Button>}
          <Button type="text">신고하기</Button>
        </>
      );
    }
    return (
      <>
        <Button type="text">차단하기</Button>
        <Button type="text">신고하기</Button>
      </>
    );
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={dummyMembers}
      renderItem={(member) => (
        <List.Item
          actions={[
            <Button type={member.isFollowing ? 'default' : 'primary'} size="small">
              {member.isFollowing ? '팔로우 중' : '팔로우하기'}
            </Button>,
            <Popover content={renderActions(member)} trigger="click">
              <Button icon={<EllipsisOutlined />} />
            </Popover>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon="user" />}
            title={
              <Space>
                <Text strong>{member.nickname}</Text>
                {member.isLeader && <Text type="secondary">| 방장</Text>}
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default GroupMember;
