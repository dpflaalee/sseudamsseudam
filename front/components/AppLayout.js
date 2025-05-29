import React from 'react';
<<<<<<< HEAD
import { Menu } from 'antd';
import Nav from './nav';
=======
import { Menu, Row, Col } from 'antd';

import Nav from './Nav';
>>>>>>> fa4b5d9f4792afd91842fd14171d2d4b9982d2e5
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PostCard from './PostCard';

const AppLayoutWrapper = styled.div`
  min-height: 100vh;
  padding: 0 16px;
  box-sizing: border-box;
`;

const ColWithOrder = styled(Col)`
  &.nav-col {
    order: 3; /* 모바일에서 하단 */
  }
<<<<<<< HEAD
`;

const NavWrapper = styled.div`
  width: 270px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 사이드바가 가로로 차지하지 않음 */
    order: 2; /* 사이드바를 메인 콘텐츠 아래로 보냄 */
=======
  &.main-col {
    order: 1;
  }
  &.right-col {
    order: 2;
>>>>>>> fa4b5d9f4792afd91842fd14171d2d4b9982d2e5
  }

<<<<<<< HEAD
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
      <MainContentWrapper style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        {/* 왼쪽 메뉴 (Nav 포함) */}
        <div style={{ flex: 0.6,  borderRight: '1px solid #ccc' }}>
          <NavWrapper> <Nav /> </NavWrapper>
        </div>

        {/* 가운데 내용 */}
        <div style={{ flex: 3, padding: '5px' }}>
          <MenuWrapper mode="horizontal" items={items} />
          <div style={{ flex: 2, padding: '5px' }}>
            {children}
          </div>
        </div>

        {/* 오른쪽 메뉴 */}
        <div style={{ flex: 0.7, padding: '5px', borderLeft: '1px solid #ccc' }}>오른쪽 메뉴</div>
      </MainContentWrapper>
=======
  @media (min-width: 768px) {
    &.nav-col {
      order: 1;
    }
    &.main-col {
      order: 2;
    }
    &.right-col {
      order: 3;
    }
  }
`;

const AppLayout = ({ children }) => {


  return (
    <AppLayoutWrapper>

      <Menu mode="horizontal"/>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>

        {/* Main Content */}
        <ColWithOrder xs={24} md={12} className="main-col">
          {children}
        </ColWithOrder>

        {/* Right Sidebar */}
        <ColWithOrder xs={0} md={6} className="right-col">
          오른쪽 메뉴
        </ColWithOrder>

        {/* Navigation */}
        <ColWithOrder xs={24} md={6} className="nav-col">
          <Nav />
        </ColWithOrder>
      </Row>
>>>>>>> fa4b5d9f4792afd91842fd14171d2d4b9982d2e5
    </AppLayoutWrapper>
  );
};

AppLayout.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AppLayout;