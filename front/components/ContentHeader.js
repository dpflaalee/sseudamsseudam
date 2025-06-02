// components/ContentHeader.js
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Dropdown, Menu, Button } from 'antd';
import {
  HomeOutlined,
  NotificationOutlined,
  TeamOutlined,
  SearchOutlined,
  MailOutlined,
  PlusOutlined,
  BellOutlined,
} from '@ant-design/icons';

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const menuItems = [
  { key: 'notice', label: '공지', icon: <NotificationOutlined />, path: '/notice' },
  { key: 'home', label: '홈', icon: <HomeOutlined />, path: '/' },
  { key: 'groups', label: '그룹', icon: <TeamOutlined />, path: '/group' },
  { key: 'notification', label: '알림', icon: <BellOutlined />, path: '/notification' },
  { key: 'search', label: '검색', icon: <SearchOutlined />, path: '/search' },
  { key: 'chat', label: '채팅', icon: <MailOutlined />, path: '/chat' },
];

const ContentHeader = () => {
  const router = useRouter();

  const currentMenu = menuItems.find((item) => router.pathname.startsWith(item.path)) || menuItems[1]; // 기본값 홈

  const handleMenuClick = ({ key }) => {
    const selected = menuItems.find((item) => item.key === key);
    if (selected) {
      router.push(selected.path);
    }
  };

  const isGroupPage = router.pathname.startsWith('/group');

  return (
    <HeaderWrapper>
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
        trigger={['click']}
      >
        <Button icon={currentMenu.icon}>
          {currentMenu.label}
        </Button>
      </Dropdown>
 
      {isGroupPage && (
        <Button
          style={{border:"0px"}}
          icon={<PlusOutlined />}
          onClick={() => console.log('그룹 생성 클릭')} // 여기에 생성 로직 연결
        />
      )}
    </HeaderWrapper>
  );
};

export default ContentHeader;
