import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Dropdown, Menu, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import CommentForm from './CommentForm';
import ComplainForm from '../Complains/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
//// import 수정

const Wrapper = styled.div`
  margin-top: 24px;
`;

const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const Text = styled.div`
  color: #333;
`;

const Date = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const Divider = styled.div`
  border-top: 1px solid #eee;
  margin: 16px 0;
`;

const Comment = (data) => {
    const [comments, setComments] = useState([
        {
            id: 1,
            nickname: '철수',
            content: '정말 좋은 글이네요!',
            date: '2025.05.29',
        },
        {
            id: 2,
            nickname: '영희',
            content: '많은 도움이 되었습니다 :)',
            date: '2025.05.29',
        },
    ]);

    const [targetId, setTargetId] = useState(null);
    const [openReport, setOpenReport] = useState(false);

    const handleAddComment = (newComment) => {
        setComments((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                nickname: '나',
                content: newComment,
                date: new Date().toLocaleDateString(),
            },
        ]);
    };

    const handleReport = (commentId) => {
        setTargetId(commentId);
        setOpenReport(true);
    };

    return (
        <Wrapper>
            <CommentForm targetNickname="작성자" onSubmit={handleAddComment} />
            <Divider />
            <ComplainForm
                open={openReport}
                onClose={() => setOpenReport(false)}
                TARGET_TYPE={TARGET_TYPE.COMMENT}
                targetId={targetId}
            />
            {comments.map((comment) => {
                const menu = (
                    <Menu>
                        <Menu.Item danger onClick={() => handleReport(comment.id)}>
                            신고하기
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <CommentItem key={comment.id}>
                        <Left>
                            <Avatar />
                            <Content>
                                <Nickname>{comment.nickname}</Nickname>
                                <Text>{comment.content}</Text>
                                <Date>{comment.date}</Date>
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
