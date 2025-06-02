import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Input, Menu, Dropdown } from 'antd';

const Wrapper = styled.div`
  padding: 5%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const ContentBox = styled.div`
  flex: 1;
`;

const TopText = styled.div`
  font-weight: 500;
`;

const Placeholder = styled.div`
  color: #999;
  margin-top: 4px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

const StyledButton = styled(Button)`
  background-color: #2f466c;
  color: white;
  border-radius: 12px;
  padding: 0 16px;
`;

const CommentForm = ({ targetNickname = '사용자' }) => {
    const [comment, setComment] = useState('');
    const handleSubmit = () => {
        if (!comment.trim()) return;
        // 실제 댓글 등록 로직은 여기서 처리
        console.log('댓글 내용:', comment);
        setComment('');
    };

    return (
        <Wrapper>
            <Row>
                <Avatar size={48} />
                <ContentBox>
                    <TopText>{targetNickname} 님에게 보내는 댓글</TopText>
                    <Input.TextArea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="댓글을 작성해 보세요"
                        autoSize={{ minRows: 2, maxRows: 4 }}
                        bordered={false}
                        style={{ marginTop: 4, paddingLeft: 0 }}
                    />
                </ContentBox>
            </Row>
            <ButtonRow>
                <StyledButton onClick={handleSubmit}>댓글 달기</StyledButton>
            </ButtonRow>      
        </Wrapper>
    );
};

export default CommentForm;
