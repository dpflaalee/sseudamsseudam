import React, { useState } from 'react';
import { Card, Avatar, Button, List, Comment, Popover } from 'antd';
import { EllipsisOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import CommentForm from '../Comment/CommentForm';
import PostImages from '../Post/PostImages';

const DetailCard = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);  // 댓글 리스트 상태 관리
  const [commentContent, setCommentContent] = useState(''); // 댓글 내용 관리

  // 댓글 폼 제출 처리
  const handleCommentSubmit = (content) => {
    setComments([...comments, { author: 'User', content, avatar: '', key: Date.now() }]);
    setCommentContent(''); // 댓글 폼 초기화
  };

  return (
    <div style={{ margin: '3%' }}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          <HeartTwoTone twoToneColor="#f00" key="heart" />,
          <MessageOutlined key="comment" />,
          <Popover
            content={
              <Button.Group>
                <>
                  <Button>수정</Button>
                  <Button type="danger">삭제</Button>
                </>
                <>
                  <Button onClick={() => setOpen(true)}>신고하기</Button>
                  {/* 신고 폼 */}
                  <ComplainForm open={open} onClose={() => setOpen(false)} targetType={TARGET_TYPE.POST} />
                </>
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar />}
          title="Unknown User"
          description="2025-05-30 14:30" // 테스트용 날짜
          style={{ marginBottom: 16 }}
        />
        <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
          This is a test post content. No need for dynamic data here.
        </div>
        {/* Test Images */}
        <PostImages images={[]} />
      </Card>

      {/* 댓글 작성 폼 */}
      <CommentForm value={commentContent} onChange={setCommentContent} onSubmit={handleCommentSubmit} />

      {/* 댓글 리스트 */}
      <List
        header={''}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Comment
              avatar={<Avatar />}
              content={item.content}
              author={item.author}
            />
          </li>
        )}
      />
    </div>
  );
};

export default DetailCard;
