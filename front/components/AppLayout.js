import React from 'react';
import { Menu, Row, Col } from 'antd'; 
import Nav from './Nav';
<<<<<<< HEAD
=======
import Calendar from './Calendar/Calendar-ssen';
import Todolists from './Calendar/Todolist/Todolists';
import EventSchedule from './Calendar/EventSchedule/EventScheduleForm';
import EventScheduleList from './Calendar/EventSchedule/EventScheduleList';
import EventScheduleManage from './Calendar/EventSchedule/EventScheduleManage';
>>>>>>> 6712fc9 (WIP: 로컬 변경사항 저장)
import PropTypes from 'prop-types';
import styled from 'styled-components';
<<<<<<< HEAD
import ContentHeader from './ContentHeader';
import PostCard from './Post/PostCard';
import DetailCard from './Detail/DetailCard'

=======
 
>>>>>>> 94edacd (calendar update)
const AppLayoutWrapper = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
`;
 
<<<<<<< HEAD
const ColWithOrder = styled(Col)`
  &.nav-col { order: 3; } /* 모바일에서 하단 */ 
  &.main-col { order: 1; }
  &.right-col { order: 2; }

  @media (min-width: 768px) {
    &.nav-col { order: 1; }
    &.main-col { order: 2; }
    &.right-col {  order: 3; }
=======
const MenuWrapper = styled(Menu)`
  width: 100%;
`;

const MainContentWrapper = styled.div`
  background-color: #ededed;
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
>>>>>>> 94edacd (calendar update)
  }
`;

const AppLayout = ({ children }) => {

  return (

  <>
    <AppLayoutWrapper>
      <Menu mode="horizontal"/>

<<<<<<< HEAD
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
=======
        <div style={{ flex: 1, padding: '16px' }}>{children}
          <EventSchedule></EventSchedule>
          <EventScheduleList></EventScheduleList>
          <EventScheduleManage></EventScheduleManage>
        </div>

        <RightSidebarWrapper>
          <Todolists></Todolists>
          <Calendar></Calendar>
        </RightSidebarWrapper>
      </MainContentWrapper>
>>>>>>> 6712fc9 (WIP: 로컬 변경사항 저장)
    </AppLayoutWrapper>
  </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
