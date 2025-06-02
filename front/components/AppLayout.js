import React from 'react';
import { Menu, Row, Col } from 'antd'; 
import Nav from './Nav';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentHeader from './ContentHeader';
import PostCard from './Post/PostCard';
import DetailCard from './Detail/DetailCard'

const AppLayoutWrapper = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
`;
 
const ColWithOrder = styled(Col)`
  &.nav-col { order: 3; } /* 모바일에서 하단 */ 
  &.main-col { order: 1; }
  &.right-col { order: 2; }

  @media (min-width: 768px) {
    &.nav-col { order: 1; }
    &.main-col { order: 2; }
    &.right-col {  order: 3; }
  }
`;

const AppLayout = ({ children }) => {

  return (

  <>
    <AppLayoutWrapper>
      <Menu mode="horizontal"/>

      <Row gutter={[16, 16]}>
        {/* Navigation */}
        {/* 애매한 공백 삭제용 padding 추가됨 */}
        <ColWithOrder xs={24} md={6} className="nav-col" style={{paddingRight:"0", borderRight:"3px solid #eee"}}> 
          <Nav />
        </ColWithOrder>

        {/* Main Content */}
        <ColWithOrder xs={24} md={12} className="main-col" style={{padding:"0",  borderRight:"3px solid #eee"}}>
        {/* 메인컨텐츠 상단고정영역추가 */}
          <ContentHeader />
          {children}
        </ColWithOrder>

        {/* Right Sidebar */}
        <ColWithOrder xs={0} md={6} className="right-col" style={{padding:"0"}}>
          오른쪽 메뉴
        </ColWithOrder>

      </Row>
    </AppLayoutWrapper>
  </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
