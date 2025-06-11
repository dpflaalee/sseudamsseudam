import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';
import ComplainForm from '../complains/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';
import useSelection from 'antd/lib/table/hooks/useSelection';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST, USER_DELETE_REQUEST } from '@/reducers/user';
import { LOAD_POSTS_REQUEST } from '@/reducers/post'
import Router from 'next/router';
import PostCard from '../post/PostCard';
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


const Profile = (props) => {
  const dispatch = useDispatch();
  const { logOutDone, user } = useSelector(state => state.user);
  const { logOutLoding, mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);

  let postUserId = props.postUserId;
  const [postUser, setPostUser] = useState('');

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


  console.log('🔥 isBlinded:', isBlinded);



  useEffect(() => {
    console.log('postUser실행');
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
    console.log('입장1');
    console.log('mainPosts', mainPosts[mainPosts.length - 1]?.id);
    const number = [1, 2, 3];
    // number = 1,
    // number = 2 
    //다른 유저를 클릭했을 때는 되고
    //본인을 클릭했을 때 안됨
    //로그인 유저
    if (hasMorePosts && !loadPostsLoading) {
      if (postUserId) {
        //postuser
        if (user.id == props.postUserId) {
          console.log('입장2');
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
            number: number[0],
            //userId: props.postUserId,
          })
        } else {
          //본인페이지 클릭
          console.log('postUserId = -1');
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
            userId: postUserId,
            number: number[1],
          })
        }
      } else {//비로그인
        console.log('비로그인 입장');
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
        })
      }
    }
  }, [mainPosts, hasMorePosts, loadPostsLoading]);
  useEffect(() => {
    if (logOutDone) {
      Router.replace('/');
    }
  }, [logOutDone])

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
      )}
    </Menu>
  );

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
              {postUser?.followerCount} 팔로잉  &nbsp;&nbsp;
              {postUser?.followingCount} 팔로워 &nbsp;&nbsp;
              {mainPosts?.length} 게시물
            </Stats>
          </InfoBox>
        </TopRow>
        {isMyProfile ? (
          <ButtonRow>
            <Button type="primary">내 쿠폰함</Button>
            <Button>내 장소</Button>
            <Button>챌린지 현황</Button>
            <Button>프로필 수정</Button>
          </ButtonRow>
        ) : (
          <ButtonRow>
            <Button type="primary">팔로우</Button>
            <Button>장소</Button>
          </ButtonRow>
        )}
      </Container>
      {!isBlinded && mainPosts.map((c) => {
        return (
          <PostCard post={c} key={c.id} />
        );
      })}
    </Wrapper>
  );
};

export default Profile;
