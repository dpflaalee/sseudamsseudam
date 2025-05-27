import React, { useState, useCallback, useEffect } from 'react';
import { Card, Avatar, Button, List, Comment, Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import CommentForm from './CommentForm';
import PostImages from './PostImages';
import { useSelector, useDispatch } from 'react-redux'; 

const PostCard = () => {


  return(
    <div style={{margin:'3%'}}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          <HeartTwoTone twoToneColor="#f00" key="heart" />,
          <MessageOutlined key="comment" />,
          <Popover content={(
            <Button.Group>
             (
                <>
                <Button>수정</Button>
                <Button type="danger">삭제</Button>
                </>
               )
               <Button style={{backgroundColor:'red', color:'white'}}>신고</Button>
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta avatar={<Avatar>{''}</Avatar>} 
                   title={''}
                   description={''} />
      </Card>
    {(
      <>
        {/* 댓글폼 */}
        <CommentForm/>
        {/* 댓글리스트 */}
        <List 
          header={''}
          itemLayout='horizontal'
          dataSource={''}
          renderItem={ (item) => (
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

export default PostCard;