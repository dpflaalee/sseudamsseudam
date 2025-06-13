import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';
import ComplainForm from '../complains/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
import FollowButton from './FollowButton';

import { useDispatch, useSelector } from 'react-redux';
import { LOAD_BLOCK_REQUEST, ADD_BLOCK_REQUEST, REMOVE_BLOCK_REQUEST, LOG_OUT_REQUEST, USER_DELETE_REQUEST } from '@/reducers/user';
import { LOAD_POSTS_REQUEST } from '@/reducers/post'
import Router from 'next/router';
import axios from 'axios';
import { LOAD_COMPLAIN_REQUEST } from '@/reducers/complain';

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


const DropdownBox = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const ButtonRow = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
`;

const Profile = (props) => {
  const dispatch = useDispatch();
  const { userOutDone, logOutDone, user } = useSelector(state => state.user);
  const { logOutLoding, mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
  const { addBlockDone, removeBlockDone } = useSelector((state) => state.user);


  let postUserId = props.postUserId;
  console.log('postUserIdpostUserId=', postUserId);
  const [postUser, setPostUser] = useState('');
  const [showMyPrize, setShowMyPrize] = useState(false);
  const { onShowMyPrize } = props

  // 신고 당한 유저 블라인드 처리
  const { mainComplainCard } = useSelector((state) => state.complain);

  useEffect(() => {
    dispatch({
      type: LOAD_COMPLAIN_REQUEST,
    });
  }, [dispatch]);

  const isBlinded = mainComplainCard.some((report) => {
    return Number(report.targetId) === Number(postUserId) && report.isBlind && report.targetType === TARGET_TYPE.USER;
  });


  const { blockList } = useSelector((state) => state.user);
  const isBlocked = blockList.some((blockedUser) => Number(blockedUser.id) === Number(postUserId));
  useEffect(() => {
    if (addBlockDone || removeBlockDone) {
      dispatch({ type: LOAD_BLOCK_REQUEST });
    }
  }, [addBlockDone, removeBlockDone]);

  useEffect(() => {
    const postUserData = async () => {
      try {
        const postUserSelect = await axios.get(`http://localhost:3065/user/postUser?userId=${postUserId}`,
          { withCredentials: true }
        )
        setPostUser(postUserSelect.data);

      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    };
    postUserData();
  }, [postUserId]);

  useEffect(() => {
    const lastId = mainPosts[mainPosts.length - 1]?.id;
    const number = [1, 2, 3];
    // number = 1,
    // number = 2 
    //다른 유저를 클릭했을 때는 되고
    //본인을 클릭했을 때 안됨
    //로그인 유저
    if (hasMorePosts && !loadPostsLoading) {
      if (postUserId) {
        //postuser
        //본인페이지 클릭
        if (user.id == props.postUserId) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
            number: number[0],
            //userId: props.postUserId,
          })
        } else {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
            userId: postUserId,
            number: number[1],
          })
        }
      } else {//비로그인
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
        })
      }
    }
  }, [postUserId]);
  //}, [mainPosts, hasMorePosts, loadPostsLoading, postUserId]);
  useEffect(() => {
    if (logOutDone) {
      Router.replace('/');
    }
  }, [logOutDone])
  useEffect(() => {
    if (userOutDone) {
      Router.replace('/');
    }
  })

  const [open, setOpen] = useState(false);
  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST })
  });
  const [] = useState(false);
  const onUserDelete = useCallback(() => {
    dispatch({
      type: USER_DELETE_REQUEST,
    })
  });

  const isMyProfile = user && (user.id == postUserId);


  const menu = (
    <Menu>
      {isMyProfile ? (
        <>
          <Menu.Item key="edit">프로필 수정</Menu.Item>
          <Menu.Item key="change-password">비밀번호 변경</Menu.Item>
          <Menu.Item key="logout" onClick={onLogout}>
            {logOutLoding ? '로그아웃 중...' : '로그아웃'}
          </Menu.Item>
          <Menu.Item key="withdraw" onClick={onUserDelete} danger>
            탈퇴하기
          </Menu.Item>
        </>
      ) : (
        <>
          {isBlocked ? (
            <Menu.Item key="unblock" onClick={() => dispatch({ type: 'REMOVE_BLOCK_REQUEST', data: postUserId })}>
              차단 해제
            </Menu.Item>
          ) : (
            <Menu.Item key="block" onClick={() => dispatch({ type: 'ADD_BLOCK_REQUEST', data: postUserId })}>
              차단하기
            </Menu.Item>
          )}
          <Menu.Item key="report" onClick={() => setOpen(true)} danger>
            신고하기
          </Menu.Item>
          <ComplainForm
            open={open}
            onClose={() => setOpen(false)}
            TARGET_TYPE={TARGET_TYPE.USER}
            targetId={postUserId}
            targetUserNickname={postUser?.nickname}
            targetUser={postUser}
          />
        </>
      )
      }
    </Menu >
  );
  if (postUser?.isBlockedMe) {
    return (
      <Wrapper>
        <Container>
          <Nickname style={{ textAlign: 'center', fontSize: '18px', color: '#999' }}>
            해당 유저의 프로필을 볼 수 없습니다. (차단됨)
          </Nickname>
        </Container>
      </Wrapper>
    );
  }
  return (

    <Wrapper>
      <Banner />
      <Container>
        <AvatarBox>
          <Avatar size={80}>
            {isBlinded ? 'X' : (postUser?.nickname || '닉네임 없음')}
          </Avatar>

        </AvatarBox>

        <DropdownBox>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </DropdownBox>

        <TopRow>
          <InfoBox>
            <Nickname>{isBlinded ? '신고 당한 유저입니다.' : (postUser?.nickname || '닉네임 없음')}</Nickname>
            <Stats>
              {postUser ? postUser?.Followings.length : 0} 팔로잉  &nbsp;&nbsp;
              {postUser ? postUser?.Followers.length : 0} 팔로워 &nbsp;&nbsp;
              {mainPosts?.length} 게시물
            </Stats>
          </InfoBox>
        </TopRow>
        {isMyProfile ? (
          <ButtonRow>
            <Button type="primary" onClick={onShowMyPrize} >내 쿠폰함</Button>
            <Button>내 장소</Button>
            <Button>챌린지 현황</Button>
            <Button>프로필 수정</Button>
          </ButtonRow>
        ) : (
          <ButtonRow>
            {/* <FollowButton post={props.postUserId} /> */}
            <FollowButton postUser={postUser}
              setPostUser={setPostUser}
              currentUserId={user?.id} />
            <Button>장소</Button>
          </ButtonRow>
        )}
      </Container>
    </Wrapper>
  );
};

export default Profile;
