import React, { useState, useEffect, useCallback } from 'react';
import { Card, Avatar, Button, Popover, Modal, Input, Space, Select } from 'antd';
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '@/reducers/post';

import PostImages from '../post/PostImages';
import { useRouter } from 'next/router';
import CommentForm from '../Comment/CommentForm';
import Comment from '../Comment/Comment';

const DetailCard = ({ post, onRefreshPost }) => {
  const id = useSelector((state) => state.user.user?.id);
  const dispatch = useDispatch();
  const router = useRouter();
  const { Option } = Select;

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [localComments, setLocalComments] = useState(post.Comments || []);
  const [open, setOpen] = useState(false);

  const like = post?.Likers?.some((v) => v.id === id);

  useEffect(() => {
    setLocalComments(post.Comments || []);
  }, [post.Comments]);

  const onClickLike = useCallback(() => {
    if (!id) return alert('로그인이 필요합니다.');
    dispatch({ type: LIKE_POST_REQUEST, data: post.id });
  }, [id, dispatch, post.id]);

  const onClickUnlike = useCallback(() => {
    if (!id) return alert('로그인이 필요합니다.');
    dispatch({ type: UNLIKE_POST_REQUEST, data: post.id });
  }, [id, dispatch, post.id]);

  const openEditModal = () => setEditModalVisible(true);
  const closeEditModal = () => setEditModalVisible(false);

  const openDeleteModal = () => setDeleteModalVisible(true);
  const closeDeleteModal = () => setDeleteModalVisible(false);

  const handleDelete = () => {
    console.log('게시물이 삭제되었습니다.');
    setDeleteModalVisible(false);
  };

  return (
    <div style={{ margin: '3%' }}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          like ? (
            <span key="heart">
              <HeartTwoTone twoToneColor="#f00" onClick={onClickUnlike} /> {post.Likers.length}
            </span>
          ) : (
            <span key="heart">
              <HeartOutlined onClick={onClickLike} /> {post.Likers.length}
            </span>
          ),
          <span key="comment">
            <MessageOutlined /> {post.Comments?.length || 0}
          </span>,
          <Popover
            content={
              <Button.Group>
                <Button onClick={openEditModal}>수정</Button>
                <Button danger onClick={openDeleteModal}>삭제</Button>
                <Button onClick={() => setOpen(true)}>신고하기</Button>
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={
          <CloseOutlined
            style={{ fontSize: 20, color: 'gray', cursor: 'pointer' }}
            onClick={() => router.push('/')}
          />
        }
      >
        <Card.Meta
          avatar={<Avatar />}
          title={post?.User?.nickname || 'Unknown'}
          description={post?.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
          style={{ marginBottom: 16 }}
        />
        <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{post.content}</div>
        <PostImages images={post?.Images || []} />
      </Card>

      <CommentForm post={post} onAddLocalComment={onRefreshPost} />
      <Comment comments={localComments} />

      <Modal
        open={editModalVisible}
        onCancel={closeEditModal}
        footer={null}
        width={600}
      >
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>게시물 수정</span>
          <Space>
            <Select defaultValue="public" style={{ width: 120 }}>
              <Option value="public">전체공개</Option>
              <Option value="friends">친구공개</Option>
              <Option value="private">비공개</Option>
            </Select>
          </Space>
        </div>
        <Input.TextArea rows={4} placeholder="내용을 수정하세요" />
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button type="primary" onClick={closeEditModal}>
            수정 완료
          </Button>
        </div>
      </Modal>

      <Modal
        title="게시물 삭제"
        open={deleteModalVisible}
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
