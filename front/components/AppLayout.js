import React from 'react';
import { Menu, Row, Col } from 'antd';
import Nav from './Nav';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AppLayoutWrapper = styled.div`
  min-height: 100vh;
  padding: 0 16px;
  box-sizing: border-box;
`;

const ColWithOrder = styled(Col)`
  &.nav-col {
    order: 3; /* 모바일에서 하단 */
  }
  &.main-col {
    order: 1;
  }
  &.right-col {
    order: 2;
  }

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
    </AppLayoutWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;