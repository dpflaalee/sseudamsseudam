import React, { useState } from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';
import ComplainForm from './complains/ComplainForm';
import TARGET_TYPE from '../../shared/constants/TARGET_TYPE';
import Link from 'next/Link';

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

const AdminProfile = () => {
    const admin = {
        nickname: '관리자',
        profileImage: null,
        followerCount: 0,
        postCount: 0,
        followingCount: 0,
    }

    const [open, setOpen] = useState(false);
    //const userId = useSelector(state => state.user.user?.id);
    const userId = 1;
    const menu = (
        <Menu>
            <Menu.Item key="logout">로그아웃</Menu.Item>
            <Menu.Item key="complain"><Link href={'/admin/complain'}>신고 페이지로 가기</Link></Menu.Item>
            <Menu.Item key="manage"><Link href={'/admin/manage'}>관리 페이지로 가기</Link></Menu.Item>
        </Menu>
    );

    return (
        <Wrapper>
            <Banner />
            <Container>
                <AvatarBox>
                    <Avatar size={80} src={admin.profileImage}>
                        {admin.nickname[0]}
                    </Avatar>
                </AvatarBox>

                <DropdownBox>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button icon={<MoreOutlined />} />
                    </Dropdown>
                </DropdownBox>

                <TopRow>
                    <InfoBox>
                        <Nickname>{admin.nickname}</Nickname>
                        <Stats>
                            {admin.followerCount} 팔로잉 &nbsp;&nbsp;
                            {admin.postCount} 팔로워 &nbsp;&nbsp;
                            {admin.followingCount} 게시물
                        </Stats>
                    </InfoBox>
                </TopRow>

                <ButtonRow>
                    <Button>프로필 수정</Button>
                    <Button type="primary">공지 작성하기</Button>
                </ButtonRow>
            </Container>
        </Wrapper>
    );
};

export default AdminProfile;
