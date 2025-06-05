import React from 'react';
import { Card } from 'antd';
import { RightOutlined, CalendarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TODOLIST_REQUEST } from '../../../reducers/todolist';
//import {useDispatch, useSelector} from 'reaxt-redux';

function getItem(label, icon) {
  return { label, icon };
}

const item = getItem('일정 더 찾아보기', <RightOutlined />);
const itemtwo = getItem('6월 일정', <CalendarOutlined />);

export const initialState = {
  todos: [],
};

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

const Todolists = () => {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const todos = useSelector((state) => state.todolist.todos) || [];

  // const handleAddEvent = () => {
  // const dummy = [...todos, {
  //     content: '이벤트 일정',
  //     date: '2025-06-10',
  //   }];
  //   dispatch({ type: ADD_TODOLIST_REQUEST, data: dummy });
  // };

  // const handleAddChallenge = () => {
  // const dummy = [...todos, {
  //     content: '챌린지 일정',
  //     date: '2025-06-12',
  //   }];
  //   dispatch({ type: ADD_TODOLIST_REQUEST, data: dummy });
  // };
return (
  <>
    <div style={{marginBottom: "25px"}}>
      <Card title={<CardTitle key="schedule" style={{cursor: 'pointer'}} onClick={() => router.push('/schedule')}>{itemtwo.icon} {itemtwo.label}</CardTitle>}>
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
</>
);
};

export default Todolists;