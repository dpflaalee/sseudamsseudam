import React, { useState, useCallback, useEffect } from 'react';
import { Card, Avatar, Button, Popover, Modal, Input, Space, Select, Comment, List  } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST,LOAD_POST_REQUEST } from '@/reducers/post';
import PostImages from '../post/PostImages';
import { useRouter } from 'next/router'; // <-- useRouter import 추가
import CommentForm from '../Comment/CommentForm';

const DetailCard = ({ post }) => {
  const id = useSelector(state => state.user.user?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const [open, setOpen] = useState(false);
  const router = useRouter(); // <-- useRouter 훅 사용
  const dispatch = useDispatch();
  const { Option } = Select;

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [comments, setComments] = useState(true);

  // 좋아요
  const onClickLike = useCallback(() => {
    if (!id) {
      return alert('로그인을 하시면 좋아요 추가가 가능합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onClickunLike = useCallback(() => {
    if (!id) {
      return alert('로그인을 하시면 좋아요 추가가 가능합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  useEffect(() => {
    if (addCommentDone) {
      dispatch({
        type: LOAD_POST_REQUEST,
        data: post.id,
      });
    }
  }, [addCommentDone]);

  const like = post?.Likers?.find((v) => v.id === id);

  //수정
  const openEditModal = () => {
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
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

  const handleEditSubmit = () => {
    if (editedContent !== post.content) {
      console.log("수정된 내용:", editedContent);
      alert('게시물이 수정되었습니다.');
    }
    closeEditModal();
  };

  return (
    <div style={{ margin: '3%' }}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          like ? (
            <HeartTwoTone twoToneColor="#f00" key="heart" onClick={onClickunLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onClickLike} />
          ),
          <MessageOutlined key="comment" />,
          <Popover
            content={
              <Button.Group>
                <Button onClick={openEditModal}>수정</Button>
                <Button type="danger" onClick={openDeleteModal}>
                  삭제
                </Button>
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
            onClick={() => router.push('/')} // 홈으로 돌아가기
          />
        }
      >
        <Card.Meta
          avatar={<Avatar />}
          title={post?.User?.nickname || 'Unknown'}
          description={post?.createdAt ? new Date(post.createdAt).toLocaleString() : '작성일 없음'}
          style={{ marginBottom: 16 }}
        />
        <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
        <PostImages images={post?.Images || []} />
      </Card>

    { comments && (
      <>
        {/* 댓글폼 */}
        <CommentForm post={post} />
        {/* 댓글리스트 */}
        <List 
          header={`댓글 ${post.Comments.length}`}
          itemLayout='horizontal'
          dataSource={post.Comments}
          renderItem={ (item) => (
            <li>
              <Comment
                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                content={item.content}
                author={item.User.nickname}
              />
            </li>
          )
          }
        />
      </>
    )}

      <Modal
        visible={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={closeEditModal}
        footer={null}
        width={600}
      >
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 'bold', marginRight: '10px' }}>게시물 수정</span>
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
