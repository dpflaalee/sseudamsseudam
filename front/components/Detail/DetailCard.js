import React, { useState } from 'react';
import { Card, Avatar, Button, List, Comment, Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import CommentForm from '../Comment/CommentForm';
import PostImages from '../Post/PostImages';
import ComplainForm from '../Complains/ComplainForm';
import { useSelector, useDispatch } from 'react-redux';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
////// import 수정

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
          <Popover content={(
            <Button.Group>
              <>
                <Button>수정</Button>
                <Button type="danger">삭제</Button>
              </>
              <>
                <Button onClick={() => setOpen(true)}>신고하기</Button>
                <ComplainForm open={open} onClose={() => setOpen(false)} TARGET_TYPE={TARGET_TYPE.POST} />
              </>
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar />}
          title={post?.User?.nickname || 'Unknown'}
          description={post?.meta?.createdAt
            ? new Date(post.meta.createdAt).toLocaleString()
            : ''}
          style={{ marginBottom: 16 }}
        />
        <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
        {/* Test Images */}
        <PostImages images={[]} />
      </Card>
      {(
        <>
          {/* 댓글폼 */}
          <CommentForm />
          {/* 댓글리스트 */}
          <List
            header={''}
            itemLayout='horizontal'
            dataSource={''}
            renderItem={(item) => (
              <li>
                <Comment
                  avatar={<Avatar></Avatar>}
                  content={''}
                  author={''}
                />
              </li>
            )
            }
          />
        </>
      )}
    </div>
  );
};

export default DetailCard;
