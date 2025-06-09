import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';
import ComplainForm from '../complains/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
import useSelection from 'antd/lib/table/hooks/useSelection';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST, USER_DELETE_REQUEST } from '@/reducers/user';
import Router from 'next/router';


const Wrapper = styled.div`
  width: 100%;
  background-color: #f0f2f5;
`;

const Banner = styled.div`
  height: 160px;
  background-color: skyblue;
  position: relative;
`;

const Container = styled.div`
  background-color: #fff;
  padding: 24px 16px 16px;
  border-radius: 12px;
  margin: -60px auto 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  max-width: 600px;
  position: relative;
`;

const AvatarBox = styled.div`
  position: absolute;
  top: -40px;
  left: 24px;
  border: 4px solid white;
  border-radius: 50%;
  background-color: white;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  margin-left: 96px; /* Avatar 오른쪽 공간 확보 */
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Stats = styled.div`
  margin-top: 4px;
  color: #555;
`;

const ButtonRow = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

const DropdownBox = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const {logOutDone, logOutLoding} = useSelector(state => state.user);
  useEffect(() => {
    if(logOutDone){  
      console.log('클릭');
      Router.replace('/');
    }
  },[logOutDone])
  useEffect(() => {

  })
  // const {
  //   nickname = '사용자명',
  //   profileImage = null,
  //   followerCount = 30,
  //   postCount = 22,
  //   followingCount = 124,
  // } = user;
  const {user} = useSelector(state => state.user);
  console.log('user.userId=',user?.id);
  
  const [open, setOpen] = useState(false);
  const onLogout = useCallback(() => {
    dispatch({type: LOG_OUT_REQUEST})
  });
  const [] = useState(false);
  const onUserDelete = useCallback(() => {
    console.log('클릭');
    dispatch({
      type: USER_DELETE_REQUEST,
    })
  });
  const menu = (
    <Menu>
      <Menu.Item key="edit">프로필 수정</Menu.Item>
      <Menu.Item key="change-password">비밀번호 변경</Menu.Item>
      <Menu.Item key="logout" onClick={onLogout} loading={logOutLoding} >로그아웃</Menu.Item>
      <Menu.Item key="withdraw" onClick={onUserDelete} danger>탈퇴하기</Menu.Item>
      <Menu.Item onClick={() => setOpen(true)} danger>신고하기</Menu.Item>
      {/* <ComplainForm open={open} onClose={() => setOpen(false)} TARGET_TYPE={TARGET_TYPE.USER} targetId={userId} /> */}
    </Menu>
  );

  return (
    <Wrapper>
      <Banner />
      <Container>
        <AvatarBox>
          <Avatar size={80} >
            {user?.nickname}
          </Avatar>
        </AvatarBox>

        <DropdownBox>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </DropdownBox>

        <TopRow>
          <InfoBox>
            <Nickname>{user?.nickname}</Nickname>
            <Stats>
              {user?.followerCount} 팔로잉 &nbsp;&nbsp;
              {user?.postCount} 팔로워 &nbsp;&nbsp;
              {user?.followingCount} 게시물
            </Stats>
          </InfoBox>
        </TopRow>

        <ButtonRow>
          <Button type="primary">내 쿠폰함</Button>
          <Button>내 장소</Button>
          <Button>챌린지 현황</Button>
          <Button>프로필 수정</Button>
        </ButtonRow>
      </Container>
    </Wrapper>
  );
};

export default Profile;
