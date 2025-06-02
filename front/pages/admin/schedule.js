import React from 'react';
import 'antd/dist/antd.css';
import AppLayout from '../components/AppLayout';
import EventSchedule from '../components/EventScheduleForm';

const SchedulePage = () => (
  <>
    <AppLayout>
      <EventSchedule />
    </AppLayout>
  </>
);

export default SchedulePage;
 
// import React, {useState, useCallback, useEffect} from "react";
// import axios from 'axios';

// import { useDispatch } from 'react-redux';

// const Schedule = () => {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   //id, createdAt, updatedAt은 제외

//   const addSchedule =  async (s) => {
//     s.preventDefault();
//     try{
//       await axios.post('api/schedule', { title, content, startDate, endDate });
//       alert('일정이 등록되었습니다.');
//     } catch (error) {
//       console.error(error);
//       alert('등록에 실패했습니다.');
//     }
//   }
// };

// export default Schedule;