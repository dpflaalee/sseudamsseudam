import React from 'react';
import { Menu } from 'antd';
import Nav from './nav';
import PropTypes from 'prop-types';
import Link from 'antd/lib/typography/Link';
import styled from 'styled-components';
import PostCard from './PostCard';

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

const NavWrapper = styled.div`
  width: 270px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 사이드바가 가로로 차지하지 않음 */
    order: 2; /* 사이드바를 메인 콘텐츠 아래로 보냄 */
  }
`;

const RightNavWrapper = styled.div`
  width: 240px;
  flex-shrink: 0;
  display: block;
  @media (max-width: 768px) {
    display: none; /* 모바일에서는 오른쪽 메뉴 숨기기 */
  }
`;

const AppLayout = ({ children, items }) => {
  return (
    <AppLayoutWrapper>
      <MenuWrapper mode="horizontal" items={items} />
      <MainContentWrapper style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        {/* 왼쪽 메뉴 (Nav 포함) */}
        <div style={{ flex: 0.6,  borderRight: '1px solid #ccc' }}>
          <NavWrapper> <Nav /> </NavWrapper>
        </div>

        {/* 가운데 내용 */}
        <div style={{ flex: 3, padding: '5px' }}>
          <div style={{ flex: 2, padding: '5px' }}>
            {children}
          </div>
        </div>

        {/* 오른쪽 메뉴 */}
        <div style={{ flex: 0.7, padding: '5px', borderLeft: '1px solid #ccc' }}>오른쪽 메뉴</div>
      </MainContentWrapper>
    </AppLayoutWrapper>
  );
};

AppLayout.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AppLayout;
