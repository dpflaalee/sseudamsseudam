import React, { useState, useCallback, useEffect } from 'react';
import { Card, Avatar, Button, List, Comment, Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import PostImages from './PostImages';
import { useSelector, useDispatch } from 'react-redux'; 

const PostCard = ({post}) => {
  const [open, setOpen] = useState(false);

  return(
    <div style={{margin:'3%'}}>
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
                </>
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta avatar={<Avatar></Avatar>}
                   title={post.User ? post.User.nickname : 'Unknown'} 
                    description={
                    post.meta && post.meta.createdAt
                      ? new Date(post.meta.createdAt).toLocaleString()
                      : null
                    }
                   style={{ marginBottom: 16 }}
        />
        <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
        {post.content}
        </div>
        {post.Images && post.Images.length > 0 && <PostImages images={post.Images} />}
      </Card>
    </div>
  ); 
};

export default PostCard;