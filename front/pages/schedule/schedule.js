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