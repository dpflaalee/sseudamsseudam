import React from 'react';
import { Avatar, Button, List, Popover, Space, Typography } from 'antd';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const GroupMember = ({ isLeader }) => {
  const members = useSelector((state) => state.group.members);
  const currentUserId = useSelector((state) => state.user.me?.id); // 로그인한 유저 ID

  const renderActions = (member) => {
    if (isLeader) {
      return (
        <Space direction="vertical">
          <Button type="text">차단하기</Button>
          {!member.isLeader && (
            <>
              <Button type="text">방장 권한 주기</Button>
              <Button type="text" danger>강퇴시키기</Button>
            </>
          )}
          <Button type="text">신고하기</Button>
        </Space>
      );
    }
    return (
      <Space>
        <Button type="text">차단하기</Button>
        <Button type="text">신고하기</Button>
      </Space>
    );
  };

  return (
    <List
      style={{ padding: '0 15px' }}
      itemLayout="horizontal"
      dataSource={members}
      renderItem={(member) => {
        const isCurrentUser = member.id === currentUserId;

        return (
          <List.Item
            actions={
              !isCurrentUser
                ? [
                    <Button
                      type={member.isFollowing ? 'default' : 'primary'}
                      size="small"
                    >
                      {member.isFollowing ? '팔로우 중' : '팔로우하기'}
                    </Button>,
                    <Popover content={renderActions(member)} trigger="click">
                      <Button icon={<EllipsisOutlined />} style={{ border: 'none' }} />
                    </Popover>,
                  ]
                : []
            }
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <Space>
                  <Text strong>{member.nickname}</Text>
                  {member.isLeader && <Text type="secondary">| 방장</Text>}
                </Space>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};

export default GroupMember;