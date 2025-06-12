import { Avatar, Card, Typography, Space, Button, Popover, Modal, Row, Col } from 'antd';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BLOCK_REQUEST } from '@/reducers/user';
import ComplainForm from '../complains/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
import FollowButton from '../user/FollowButton';
const { Text } = Typography;
import Router from 'next/router';

const SearchUserList = ({ user }) => {
  const dispatch = useDispatch();
  const [complainVisible, setComplainVisible] = useState(false);

  const renderActions = (user) => (
    <Space>
      <Button type="text" onClick={() => dispatch({ type: ADD_BLOCK_REQUEST, data: user.id })}>
        차단하기
      </Button>
      <Button type="text" onClick={() => setComplainVisible(true)} danger>신고하기</Button>
    </Space>
  );
  const me = useSelector(state => state.user);
  const handleUserClick = (e) => {
    e.stopPropagation();
    Router.push(`/user/myPage/${user.id}`);
  };
  console.log('🐶 me.id', me.user.id);
  console.log('🐶 user.id', user.id);
  return (
    <>
      <Card
        onClick={handleUserClick}>
        <Row justify="space-between" align="middle">
          {/* 왼쪽: 아바타 + 닉네임 */}
          <Col>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <Text strong>{user.nickname}</Text>
            </Space>
          </Col>

          {/* 오른쪽: 버튼 */}
          {me.user.id !== user.id ?
            <Col>
              <Space>
                <FollowButton postUser={user}
                  setPostUser={user}
                  currentUserId={me?.user?.id} />
                <Popover content={renderActions()} trigger="click">
                  <Button icon={<EllipsisOutlined />} style={{ border: 'none' }} />
                </Popover>
              </Space>
            </Col>
            :
            <Col>
              <Button type='primary' onClick={handleUserClick}> 내 프로필로 이동 </Button>
            </Col>
          }
        </Row>
      </Card>

      <Modal
        open={complainVisible}
        onCancel={() => setComplainVisible(false)}
        footer={null}
        title="신고하기"
      >
        <ComplainForm targetId={user.id} targetType={TARGET_TYPE.USER} targetUserNickname={user.nickname} />
      </Modal>
    </>
  );
};

export default SearchUserList;
