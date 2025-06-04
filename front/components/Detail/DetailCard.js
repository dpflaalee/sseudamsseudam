import React, { useState, useCallback, useEffect } from 'react';
import { Card, Avatar, Button, List, Popover, Modal, Input, Space, Select } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/Link';
import { useRouter } from 'next/router';

import CommentForm from '../Comment/CommentForm';
import Comment from '../Comment/Comment';
import PostImages from '../post/PostImages';
import ComplainForm from '../complains/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';

const DetailCard = ({ post = {} }) => {
  const id = useSelector( state => state.user.user?.id );   
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { Option } = Select;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);  
  const handleClose = () => { router.push('/'); };  
  const [comments, setComments] = useState([
    {
      id: 1,
      nickname: '홍길동',
      content: '좋은 글이네요!',
      date: '2025-06-01 12:34',
    },
    {
      id: 2,
      nickname: '김철수',
      content: '공감합니다.',
      date: '2025-06-01 13:12',
    },
  ]);

  // 좋아요
  const onClickLike = useCallback(() => { 
    if (!id) {return alert('로그인을 하시면 좋아요 추가가 가능합니다.');}
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id
    });
  }, [id] );

  const onClickunLike = useCallback(() => { 
    if (!id) {return alert('로그인을 하시면 좋아요 추가가 가능합니다.');}
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id
    });
  }, [id] );

  const like = post?.Likers?.find((v) => v.id === id);

    //수정
  const openEditModal = () => {
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
  };
  const handleEditSubmit = () => {
    // console.log('수정된 내용:', newContent);
    setEditModalVisible(false);
  };

  //삭제
  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };
  const handleDelete = () => {
    console.log('게시물이 삭제되었습니다.');
    setDeleteModalVisible(false);
  };

  return (
    <div style={{ margin: '3%' }}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          like
            ? <HeartTwoTone twoToneColor="#f00" key="heart" onClick={onClickunLike} />
            : <HeartOutlined key="heart" onClick={onClickLike} />,
          <MessageOutlined key="comment" />,
          <Popover content={(
            <Button.Group>
                <>
                <Button onClick={openEditModal}>수정</Button>
                <Button type="danger" onClick={openDeleteModal}>삭제</Button>
                </>
                <>
                <Button onClick={() => setOpen(true)}>신고하기</Button>
                </>
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
        extra={
          <CloseOutlined
            style={{ fontSize: 20, color: 'gray', cursor: 'pointer' }} // X 아이콘 스타일
            onClick={handleClose} // 클릭 시 홈으로 이동
          />
        }            
      >
        <Card.Meta
          avatar={<Avatar />}
          title={post?.User?.nickname || 'Unknown'}
          description={
            post?.meta?.createdAt
              ? new Date(post.meta.createdAt).toLocaleString()
              : ''
          }
          style={{ marginBottom: 16 }}
        />
        <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
        <PostImages images={[]} />
      </Card>

      {/* 댓글 입력 */}
      <CommentForm />
      {/* 댓글 리스트 */}
      <Comment comments={comments} />

      <Modal
        visible={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={closeEditModal}
        footer={null}
        width={600}
      >
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 'bold', marginRight: '10px'}}>게시물 수정</span>
          <Space>
            <Select defaultValue="public" style={{ width: 120 }}>
              <Option value="public">전체공개</Option>
              <Option value="friends">친구공개</Option>
              <Option value="private">비공개</Option>
            </Select>
          </Space>
        </div>

        <Input.TextArea
          // value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
          placeholder="내용을 수정하세요"
        />
        
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button onClick={handleEditSubmit} type="primary">
            수정 완료
          </Button>
        </div>
      </Modal>
      <Modal
        title="게시물 삭제"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
        okText="삭제"
        cancelText="취소"
        cancelButtonProps={{ danger: true }}
      >
      <p>이 게시물을 정말 삭제하시겠습니까?</p>
      </Modal>

    </div>
  );
};

export default DetailCard;
