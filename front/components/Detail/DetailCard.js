import React, { useState, useEffect, useCallback } from 'react';
import { Card, Avatar, Button, Popover, Modal, Input, Space, Select } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined, CloseOutlined, } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST, UPDATE_POST_REQUEST } from '@/reducers/post';
import Link from 'next/Link';

import PostImages from '../post/PostImages';
import { useRouter } from 'next/router';
import CommentForm from '../comment/CommentForm';
import Comment from '../comment/Comment';
import PostCardContent from '../post/PostCardContent';

import { ADD_NOTIFICATION_REQUEST } from '@/reducers/notification'
import NOTIFICATION_TYPE from '../../../shared/constants/NOTIFICATION_TYPE';

const DetailCard = ({ post, onRefreshPost }) => {
  const id = useSelector((state) => state.user.user?.id);
  const dispatch = useDispatch();
  const router = useRouter();
  const { Option } = Select;
  const [newContent, setNewContent] = useState(post.content);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { removePostDone } = useSelector((state) => state.post);
  const [localComments, setLocalComments] = useState(post.Comments || []);
  const [open, setOpen] = useState(false);

  const like = post?.Likers?.some((v) => v.id === id);
  const [liked, setLiked] = useState(post?.Likers?.some((v) => v.id === id));
  const [likeLoading, setLikeLoading] = useState(false);


  useEffect(() => {
    setLocalComments(post.Comments || []);
  }, [post.Comments]);

  useEffect(() => {
    setLiked(post?.Likers?.some((v) => v.id === id));
  }, [post?.Likers, id]);

  const onClickLike = useCallback(() => {
    if (!id) {
      return alert('로그인을 하시면 좋아요 추가가 가능합니다.');
    }
    setLiked(true); // 낙관적 업데이트

    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
      callback: () => {
        onRefreshPost?.(); // 서버 최신화가 필요하면
      },
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
  }, [id, post.id, post.User.id, likeLoading]);

  const onClickunLike = useCallback(() => {
    if (!id) return alert('로그인을 하시면 좋아요 취소가 가능합니다.');
    setLiked(false); // 낙관적 업데이트

    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
      callback: () => {
        onRefreshPost?.();
      },
    });
  }, [id]);

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
    router.push('/main');
  }, [newContent, post, dispatch, router, closeEditModal]);

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
    setDeleteModalVisible(false);
    router.push('/main');
  }, [dispatch, post.id, router]);

  const [editMode, setEditMode] = useState(false);
  const onClickUpdate = useCallback(() => { setEditMode(true); }, []);
  const onCancelUpdate = useCallback(() => { setEditMode(false); }, []);
  const onEditPost = useCallback((editText) => () => {
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: { PostId: post.id, content: editText }
    });
  }, [post]);
  const onRetweet = useCallback(() => {
    if (!id) { return alert('로그인 후 리트윗이 가능합니다.'); }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id
    });
  });

  /// 신고 처리된 댓글 , 게시글 블라인드 처리
  const { mainComplainCard } = useSelector(state => state.complain);
  const isBlinded = mainComplainCard?.some((report) => report.targetId === post.id && report.isBlind);
  const content = isBlinded ? '신고된 게시글입니다.' : post.content;
  const processedComments = post.Comments.map(comment => {
    const isCommentBlind = mainComplainCard?.some((report) => report.targetId === comment.id && report.isBlind);
    const processedRecomments = comment.Recomments?.map(recomment => {
      const isRecommentBlind = mainComplainCard?.some((report) => report.targetId === recomment.id && report.isBlind);
      return {
        ...recomment,
        content: isRecommentBlind ? '신고된 댓글입니다.' : recomment.content,
      };
    }) || [];

    return {
      ...comment,
      content: isCommentBlind ? '신고된 댓글입니다.' : comment.content,
      Recomments: processedRecomments,
    };
  });




  return (
    <div style={{ margin: '3%' }}>
      <Card
        cover={post.Images && post.Images.length > 0 && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <span key="heart"><HeartTwoTone twoToneColor="#f00" onClick={onClickunLike} /> {post.Likers.length}</span>
            : <span key="heart"><HeartOutlined onClick={onClickLike} /> {post?.Likers?.length}</span>,
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
            onClick={() => router.push('/main')}
          />
        }
      >
        {post.RetweetId && post.Retweet ? (
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
                postData={content}
              />
            }
          />
        )}
      </Card>

      <CommentForm post={post} onAddLocalComment={onRefreshPost} />
      <Comment comments={processedComments} postId={post.id} post={post} onRefreshPost={onRefreshPost} />

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
    </div>
  );
};

export default DetailCard;