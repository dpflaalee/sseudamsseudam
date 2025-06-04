import React, { useState } from 'react';
import { Avatar, Button, List, Popover, Space, Typography, message } from 'antd';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const initialMembers = [
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
  const currentUserId = 1; // 로그인한 유저 ID (하드코딩)
  const [members, setMembers] = useState(initialMembers);

  const handleKick = (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    message.success('멤버를 강퇴했습니다.');
  };

    const handleGiveLeadership = (newLeaderId) => {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id === newLeaderId) {
          return { ...member, isLeader: true };
        } else if (member.id === currentUserId) {
          return { ...member, isLeader: false };
        }
        return member;
      })
    );
    message.success('방장 권한이 위임되었습니다.');
  };

  const renderActions = (member) => {
    if (isLeader) {
      return (
        <>
          <Button type="text">차단하기</Button>
          {!member.isLeader && (
            <>
              <Button type="text" onClick={() => handleGiveLeadership(member.id)}>
                방장 권한 주기</Button>
              <Button type="text" danger onClick={() => handleKick(member.id)}>
                강퇴시키기
              </Button>
            </>
          )}
          <Button type="text">신고하기</Button>
        </>
      );
    }
    return (
      <div style={{display:'flex'}}>
        <Button type="text">차단하기</Button>
        <Button type="text">신고하기</Button>
      </div>
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
                      <Button icon={<EllipsisOutlined />} style={{border:'none'}}/>
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
