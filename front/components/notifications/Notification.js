import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { List, Avatar } from "antd";
import { HeartFilled, RetweetOutlined, MessageOutlined, UserAddOutlined, NotificationOutlined, GiftOutlined, TeamOutlined, CrownFilled, CloseOutlined } from '@ant-design/icons';
import NOTIFICATION_TYPE from '../../../shared/constants/NOTIFICATION_TYPE';

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

const Container = styled.div`
  display: flex;
  padding: 16px;
  background: ${(props) => (props.isRead ? '#fff' : '#e6f7ff')}; // 읽지 않은 알림은 파란 배경
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
  &:hover {
    background: #f0f0f0;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  color: #999;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #ff4d4f;
  }
`;
const Notification = ({ noti, onDelete }) => {
  console.log('🔍 noti 전체:', noti);


  const renderIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPE.LIKE:
        return <HeartFilled style={{ color: 'hotpink' }} />;
      case NOTIFICATION_TYPE.RETWEET:
        return <RetweetOutlined />;
      case NOTIFICATION_TYPE.COMMENT:
        return <MessageOutlined />;
      case NOTIFICATION_TYPE.FOLLOW:
        return <UserAddOutlined />;
      case NOTIFICATION_TYPE.RECOMMNET:
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
  const renderContent = (noti) => {
    const sender = noti?.Sender || 'Dan';
    const notiType = noti?.type;

    switch (notiType) {
      case NOTIFICATION_TYPE.LIKE:
        return `${sender.nickname}님이 당신의 게시물을 좋아요했습니다.`;
      case NOTIFICATION_TYPE.RETWEET:
        return `${sender.nickname}님이 당신의 게시물을 리트윗했습니다.`;
      case NOTIFICATION_TYPE.COMMENT:
        return `${sender.nickname}님이 당신의 게시물에 댓글을 남겼습니다.`;
      case NOTIFICATION_TYPE.FOLLOW:
        return `${sender.nickname}님이 당신을 팔로우했습니다.`;
      case NOTIFICATION_TYPE.RECOMMNET:
        return `${sender.nickname}님이 당신의 댓글에 답글을 남겼습니다.`;
      case NOTIFICATION_TYPE.RANDOMBOX:
        return `${sender.nickname}님! 랜덤박스가 도착했어요 확인해보세요!`;
      case NOTIFICATION_TYPE.GROUPAPPLY:
        return `${sender.nickname}님이 그룹 신청을 했습니다.`;
      case NOTIFICATION_TYPE.GROUPAPPLY_APPROVE:
        return `${sender.nickname}님! 그룹에 가입 신청이 승입되었습니다.`;
      case NOTIFICATION_TYPE.GROUPAPPLY_REJECT:
        return `${sender.nickname}님이 그룹 신청이 거절되었습니다.`;
      case NOTIFICATION_TYPE.ADMIN_NOTI:
        return `관리자 알림: 새로운 공지가 등록되었습니다.`;
      case NOTIFICATION_TYPE.ANIMAL_FRIENDS:
        return `${sender.nickname}님이 친구가 되고 싶어해요!`;
      default:
        return '알 수 없는 알림';
    }
  };
  return (
    <Container isRead={noti.isRead}>
      <IconWrapper>{renderIcon(noti.type)}</IconWrapper>
      <Content>
        <Title>{renderContent(noti)}</Title>
      </Content>
      <DeleteButton onClick={() => onDelete(noti.id)}>
        <CloseOutlined />
      </DeleteButton>
    </Container>
  );
};

export default Notification;
