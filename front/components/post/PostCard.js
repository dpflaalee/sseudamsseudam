import React, { useState, useCallback, useEffect } from 'react';
import { Card, Avatar, Button, List, Comment, Popover, Modal, Input, Space, Select } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import PostImages from './PostImages';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/Link';

const PostCard = ({post}) => {
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newContent, setNewContent] = useState(post.content);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  //수정
  const openEditModal = () => {
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
  };
  const handleEditSubmit = () => {
    console.log('수정된 내용:', newContent);
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

  return(
    <div style={{margin:'3%'}}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          <HeartTwoTone twoToneColor="#f00" key="heart" />,
          <><Link href={`/detail`}><MessageOutlined key="comment" /></Link></>,
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

export default PostCard;