import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Dropdown, Menu, Button } from 'antd';
import { HomeOutlined, NotificationOutlined, TeamOutlined, SearchOutlined, MailOutlined, PlusOutlined, BellOutlined,} from '@ant-design/icons';

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  box-sizing: border-box;
`;

const LeftWrapper = styled.div`
  align-items: center;
  min-width: 0;
  max-width: 50%;
  flex-shrink: 1;
`;

const RightWrapper = styled.div`
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
  max-width: 50%;
  flex-shrink: 1;
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
  const currentMenu = menuItems.find((item) => router.pathname.startsWith(item.path)) || menuItems[1];

  const handleMenuClick = ({ key }) => {
    const selected = menuItems.find((item) => item.key === key);
    if (selected) { router.push(selected.path);  }
  };

  const isGroupPage = router.pathname.startsWith('/group');

  return (
    <HeaderWrapper>
      <LeftWrapper>
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
          <Button icon={currentMenu.icon}>{currentMenu.label}</Button>
        </Dropdown>
      </LeftWrapper>

      <RightWrapper>
        {isGroupPage && (
          <Button
            icon={<PlusOutlined />}
            style={{ border: 'none' }}
            onClick={() => router.push('/groups/groupCreate')} 
          />
        )}
      </RightWrapper>
    </HeaderWrapper>
  );
};

export default ContentHeader;