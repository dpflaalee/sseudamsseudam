import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Dropdown, Menu, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import ComplainForm from '../complains/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';

const Wrapper = styled.div`
  margin-top: 24px;
`;

const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const NicknameDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Nickname = styled.div`
  font-weight: 600;
  color: #333;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const Text = styled.div`
  color: #555;
  white-space: pre-wrap;
  line-height: 1.4;
`;

const Comment = ({ comments = [] }) => {
  const [targetId, setTargetId] = useState(null);
  const [openReport, setOpenReport] = useState(false);

  const handleReport = (commentId) => {
    setTargetId(commentId);
    setOpenReport(true);
  };

  return (
    <Wrapper>
      <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
        댓글 {comments.length}개
      </div>
      {comments.length === 0 && <div>댓글이 없습니다.</div>}
      {comments.map((comment) => {
        const createdAt = comment.createdAt
          ? new Date(comment.createdAt).toLocaleString()
          : '';

        const menu = (
          <Menu>
            <Menu.Item>수정</Menu.Item>
            <Menu.Item danger>삭제</Menu.Item>
            <Menu.Item danger onClick={() => handleReport(comment.id)}>
              신고하기
            </Menu.Item>
            <ComplainForm
              open={openReport}
              onClose={() => setOpenReport(false)}
              TARGET_TYPE={TARGET_TYPE.COMMENT}
              targetId={targetId}
              targetUserNickname={comment.User?.nickname}
            />
          </Menu>
        );

        return (
          <CommentItem key={comment.id}>
            <Left>
              <Avatar>{comment.User?.nickname?.[0] || 'Unknown'}</Avatar>
              <Content>
                <NicknameDateWrapper>
                  <Nickname>{comment.User?.nickname || '알 수 없음'}</Nickname>
                  {createdAt && <CommentDate>{createdAt}</CommentDate>}
                </NicknameDateWrapper>
                <Text>{comment.content}</Text>
              </Content>
            </Left>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="text" icon={<MoreOutlined />} />
            </Dropdown>
          </CommentItem>
        );
      })}
    </Wrapper>
  );
};

export default Comment;
