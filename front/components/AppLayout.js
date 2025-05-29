import React from 'react';
import { Menu } from 'antd';
import Nav from './Nav';
import PropTypes from 'prop-types';
import Link from 'antd/lib/typography/Link';
import styled from 'styled-components';

const AppLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MenuWrapper = styled(Menu)`
  width: 100%;
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column; /* 모바일에서는 세로로 쌓이게 */
  }
`;

const SidebarWrapper = styled.div`
  width: 240px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 사이드바가 가로로 차지하지 않음 */
    order: 2; /* 사이드바를 메인 콘텐츠 아래로 보냄 */
  }
`;

const RightSidebarWrapper = styled.div`
  width: 240px;
  flex-shrink: 0;
  display: block;
  @media (max-width: 768px) {
    display: none; /* 모바일에서는 오른쪽 메뉴 숨기기 */
  }
`;

const AppLayout = ({ children }) => {
  const items = [
    { label: <Link to="/">LOGO</Link>, key: '/' }
  ];

  return (
    <AppLayoutWrapper>
      <MenuWrapper mode="horizontal" items={items} />
      <MainContentWrapper>
        <SidebarWrapper> <Nav /> </SidebarWrapper>

        <div style={{ flex: 1, padding: '16px' }}>{children}</div>

        <RightSidebarWrapper>오른쪽 메뉴</RightSidebarWrapper>
      </MainContentWrapper>
    </AppLayoutWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
