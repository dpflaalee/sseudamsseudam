import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventScheduleChange from '../components/EventScheduleChange'; // 경로 맞게 조정

const EditSchedule = () => {
  const router = useRouter();
  const { id } = router.query;
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3065/calendar/${id}`)
        .then((res) => setSchedule(res.data))
        .catch((err) => {
          console.error(err);
          alert('일정 정보를 불러오는데 실패했습니다.');
        });
    }
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3065/calendar/${id}`, updatedData);
      alert('일정이 성공적으로 수정되었습니다.');
      router.push('/schedule'); // 수정 후 목록 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('일정 수정에 실패했습니다.');
    }
  };

  if (!schedule) return <div>로딩 중...</div>;

  return <EventScheduleChange schedule={schedule} onSubmit={handleSubmit} />;
};

export default EditSchedule;
