import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Button, List, Popover, Modal, Input, Space, Select } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import PostImages from './PostImages';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/Link';
import { LIKE_POST_REQUEST,UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST, UPDATE_POST_REQUEST, RETWEET_REQUEST } from '@/reducers/post';
import ComplainForm from '../complains/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
import PostCardContent from './PostCardContent';

import { ADD_NOTIFICATION_REQUEST } from '@/reducers/notification'
import NOTIFICATION_TYPE from '../../../shared/constants/NOTIFICATION_TYPE';

const PostCard = ({ post, isGroup = false }) => { // 그룹용 추가코드
  const id = useSelector(state => state.user.user?.id);
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const dispatch = useDispatch();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const onCancelUpdate = useCallback(() => { setEditMode(false); },[]);
  const onEditPost = useCallback((editText) => () => {
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: { PostId:post.id, content:editText }
    });
  },[post]);

  const [newContent, setNewContent] = useState(post.content);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { removePostLoading, removePostDone } = useSelector(state => state.post)

  // 좋아요
  const onClickLike = useCallback(() => {
    if (!id) { return alert('로그인을 하시면 좋아요 추가가 가능합니다.'); }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id
    });
    dispatch({
      type: ADD_NOTIFICATION_REQUEST,
      data: {
        notiType: NOTIFICATION_TYPE.LIKE,
        SenderId: id,
        ReceiverId: post.User.id,
        targetId: post.id,
      }
    });
  }, [id]);

  const onClickunLike = useCallback(() => {
    if (!id) { return alert('로그인을 하시면 좋아요 추가가 가능합니다.'); }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id
    });
  }, [id]);

  const like = post.Likers?.find((v) => v.id === id);

  //수정
  const openEditModal = useCallback(() => {
    setEditModalVisible(true);
  }, []);
  const closeEditModal = useCallback(() => {
    setEditModalVisible(false);
  }, []);
  const handleEditSubmit = useCallback(() => {
    if (newContent.trim() === post.content.trim()) {
      return closeEditModal();
    }
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: { PostId: post.id, content: newContent }
    });
    setEditModalVisible(false);
  }, [newContent, post, dispatch]);

  //삭제
  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };
  const handleDelete = useCallback(() => {
    dispatch({ 
      type: REMOVE_POST_REQUEST,
      data: post.id 
    });  
  },[]);

  // 리트윗
  const onRetweet = useCallback(() => {
    if (!id) { return alert('로그인 후 리트윗이 가능합니다.'); }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id
    });
  });  
  return (
    <div style={{ margin: '3%' }}>
      <Card
        title={isGroup ? `[그룹]${post.User?.nickname}` : post.User?.nickname} // 그룹용 추가코드
        cover={ post.Images && post.Images.length > 0 && <PostImages images={post.Images}/> }
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          like
            ? <span key="heart"><HeartTwoTone twoToneColor="#f00" onClick={onClickunLike} /> {post.Likers.length}</span>
            : <span key="heart"><HeartOutlined onClick={onClickLike} /> {post?.Likers?.length}</span>,
          <span key="comment">
            <Link href={`/post/${post.id}`} passHref>
              <MessageOutlined /> {post.Comments?.length || 0}
            </Link>
          </span>,
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
            < EllipsisOutlined />
          </Popover>
        ]}
        // extra={<>{id && id !== post.User.id && <FollowButton post={post} />}</>}
      >
      { post.RetweetId && post.Retweet ? (
        <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
          <Card.Meta
            avatar={<Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar></Link>} 
            title={post.Retweet.User.nickname}
            description={
              <PostCardContent 
                editMode={editMode}
                onEditPost={onEditPost}
                onCancelUpdate={onCancelUpdate}
                postData={post.Retweet.content}
              />} 
          />
        </Card>
      ) : (
          <Card.Meta
            avatar={
              <Link href={`/user/${post.User.id}`} prefetch={false}>
                <Avatar>{post.User.nickname[0]}</Avatar>
              </Link>
            }
            title={post.User.nickname}
            description={
              <PostCardContent
                editMode={editMode}
                onEditPost={onEditPost}
                onCancelUpdate={onCancelUpdate}
                postData={post.content}
              />
            }
          />

      )}       
        {/* 신고 모달 */}
        {open && (
          <ComplainForm
            open={open}
            targetId={post.id}
            TARGET_TYPE={TARGET_TYPE.POST}
            targetUserNickname={post.User?.nickname}
            onClose={() => setOpen(false)}
          />
        )}
        {/* E 신고 모달 */}

      </Card >

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

        <Input.TextArea
          value={newContent}
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

    </div >
  );
};

PostCard.propTypes = { post: PropTypes.object.isRequired };

export default PostCard;