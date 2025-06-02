import React from 'react';
import { Card } from 'antd';
import { RightOutlined, CalendarOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import {LOAD_TODOLIST_REQUEST} from '../../../reducers/todolist';
//import {useDispatch, useSelector} from 'reaxt-redux';

function getItem(label, icon) {
  return { label, icon };
}

const item = getItem('일정 더 찾아보기', <RightOutlined />);
const itemtwo = getItem('6월 일정', <CalendarOutlined />);

const gridStyle = {
  padding: '10px',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer',
  // boxShadow: '0 0 0 0',    //호버 섀도우 없애기
}; 

const gridbar = {
  color: '#364F6B',
  padding: '10px',
  width: '100%',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  boxShadow: '0 0 0 0',    //호버 섀도우 없애기
  cursor: 'pointer'
};

const dateView = {
  color: '#807E7E', 
};

const CardTitle = styled.span`
  padding: 0px !important;
  // margin: -5px;
  width: 100%;
`;

const Todolists = () => (
  <div style={{marginBottom: "25px"}}>
    <Card title={<CardTitle>{itemtwo.icon} {itemtwo.label}</CardTitle>}>
    <Card.Grid style={gridStyle}>Content
      <span style={dateView}><br/>date</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content
      <span style={dateView}><br/>date</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content
      <span style={dateView}><br/>date</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content
      <span style={dateView}><br/>date</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content
      <span style={dateView}><br/>date</span>
    </Card.Grid>
    <Card.Grid style={gridbar}>{item.label} {item.icon}</Card.Grid>
  </Card>
  </div>
);

export default Todolists;