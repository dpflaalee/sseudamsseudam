import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { HeartFilled, RetweetOutlined, MessageOutlined, UserAddOutlined, NotificationOutlined, GiftOutlined, TeamOutlined, CrownFilled } from '@ant-design/icons';
import NOTIFICATION_TYPE from './../../../shared/constants/NOTIFICATION_TYPE';

const Container = styled.div`
  display: flex;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
  &:hover {
    background: #f9f9f9;
  }
`;

const IconWrapper = styled.div`
  font-size: 20px;
  margin-right: 12px;
  color: ${props => props.color || '#666'};
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const Description = styled.div`
  color: #999;
  font-size: 14px;
`;

const Notification = ({ type, user, target, content }) => {
  const renderIcon = () => {
    switch (type) {
      case NOTIFICATION_TYPE.LIKE:
        return <HeartFilled style={{ color: 'hotpink' }} />;
      case NOTIFICATION_TYPE.RETWEET:
        return <RetweetOutlined />;
      case NOTIFICATION_TYPE.COMMENT:
        return <MessageOutlined />;
      case NOTIFICATION_TYPE.FOLLOW:
        return <UserAddOutlined />;
      case NOTIFICATION_TYPE.REPLY:
        return <MessageOutlined style={{ color: '#0066CC' }} />;
      case NOTIFICATION_TYPE.RANDOMBOX:
        return <GiftOutlined style={{ color: '#FF9E00' }} />;
      case NOTIFICATION_TYPE.GROUPAPPLY:
        return <TeamOutlined style={{ color: '#28a745' }} />;
      case NOTIFICATION_TYPE.GROUPAPPLY_APPROVE:
        return <TeamOutlined style={{ color: '#28a745' }} />;
      case NOTIFICATION_TYPE.GROUPAPPLY_REJECT:
        return <TeamOutlined style={{ color: '#28a745' }} />;
      case NOTIFICATION_TYPE.ADMIN_NOTI:
        return <NotificationOutlined style={{ color: '#ffcc00' }} />;
      case NOTIFICATION_TYPE.ANIMAL_FRIENDS:
        return <CrownFilled style={{ color: '#ff1493' }} />;
      default:
        return null;
    }
  };

  // 알림 유형에 맞는 텍스트 내용 렌더링
  const renderContent = () => {
    switch (type) {
      case NOTIFICATION_TYPE.LIKE:
        return `${user.nickname}님이 당신의 게시물을 좋아요했습니다.`;
      case NOTIFICATION_TYPE.RETWEET:
        return `${user.nickname}님이 당신의 게시물을 리트윗했습니다.`;
      case NOTIFICATION_TYPE.COMMENT:
        return `${user.nickname}님이 당신의 게시물에 댓글을 남겼습니다.`;
      case NOTIFICATION_TYPE.FOLLOW:
        return `${user.nickname}님이 당신을 팔로우했습니다.`;
      case NOTIFICATION_TYPE.REPLY:
        return `${user.nickname}님이 당신의 댓글에 답글을 남겼습니다.`;
      case NOTIFICATION_TYPE.RANDOMBOX:
        return `${user.nickname}님! 랜덤박스가 도착했어요 확인해보세요!`;
      case NOTIFICATION_TYPE.GROUPAPPLY:
        return `${user.nickname}님이 그룹 신청을 했습니다.`;
      case NOTIFICATION_TYPE.GROUPAPPLY_APPROVE:
        return `${user.nickname}님! 그룹에 가입 신청이 승입되었습니다.`;
      case NOTIFICATION_TYPE.GROUPAPPLY_REJECT:
        return `${user.nickname}님이 그룹 신청이 거절되었습니다.`;
      case NOTIFICATION_TYPE.ADMIN_NOTI:
        return `관리자 알림: ${content}`;
      case NOTIFICATION_TYPE.ANIMAL_FRIENDS:
        return `${user.nickname}님이 친구가 되고 싶어해요!`;
      default:
        return '알 수 없는 알림';
    }
  };

  return (
    <Container>
      <IconWrapper>{renderIcon()}</IconWrapper>
      <Avatar style={{ marginRight: 12 }} />
      <Content>
        <Title>{renderContent()}</Title>
        <Description>{content || '디테일한 설명이 여기에 들어갑니다.'}</Description>
      </Content>
    </Container>
  );
};

export default Notification;
