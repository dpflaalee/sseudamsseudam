import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AppLayout from '../../components/AppLayout';
import EventScheduleChange from '../../components/Calendar/EventSchedule/EventScheduleChange';

const EditSchedulePage = () => {
  const router = useRouter();
  const { id } = router.query;  // 쿼리 파라미터에서 id 받아오기
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    if (!id) return; // id가 없으면 fetch 중단
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(`http://localhost:3065/calendar/${id}`);
        setSchedule(res.data);
      } catch (error) {
        alert('일정 정보를 불러오는데 실패했습니다.');
      }
    };
    fetchSchedule();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3065/calendar/${id}`, updatedData);
      alert('일정이 성공적으로 수정되었습니다.');
      router.push('/schedule');
    } catch (error) {
      alert('일정 수정에 실패했습니다.');
    }
  };

  if (!schedule) return <div>로딩 중...</div>;

  return (
  <AppLayout>
    <EventScheduleChange schedule={schedule} onSubmit={handleSubmit} />
  </AppLayout>
  );
};

export default EditSchedulePage;
