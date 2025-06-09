import React from 'react';
import 'antd/dist/antd.css';
import AppLayout from '../../components/AppLayout';
import EventScheduleChange from '../../components/Calendar/EventSchedule/EventScheduleChange';

const changeschedule = () => {
  return (
    <AppLayout>
      <EventScheduleChange />
    </AppLayout>
  );
};

export default changeschedule;