import React from 'react';
import AppLayout from '../../components/AppLayout';
import EventSchedule from '../../components/Calendar/EventSchedule/EventScheduleForm'; // 컴포넌트가 components에 있을 경우

const RegiSchedulePage = () => {
  return (
    <AppLayout>
      <EventSchedule />;
    </AppLayout>
  );
};

export default RegiSchedulePage;
