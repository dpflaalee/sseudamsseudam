import React, { useEffect, useState } from 'react';
import { Divider, Button, message } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);

const dateView = {
  color: '#807E7E',
};

const dateStyle = {
  color: '#807E7E',
  fontSize: '13px',
};

const EventScheduleList = () => {
  const router = useRouter();
  const [schedules, setSchedules] = useState([]);

  const handleAddEvent = () => router.push('/challenge/regichallenge');
  const handleChangeEvent = (id) => {
    router.push(`/challenge/editchallenge?id=${id}`);
  };
  const seeMore = () => router.push('/challenge/morechallenge');

  const fetchSchedules = async () => {
    try {
      const res = await axios.get('http://localhost:3065/calendar');      
      // 날짜 기준으로 오름차순 정렬
      const sortedSchedules = res.data.sort((a, b) => dayjs(a.startDate).isBefore(dayjs(b.startDate)) ? -1 : 1);
      setSchedules(sortedSchedules);
    } catch (error) {
      console.error('챌린지 불러오기 실패:', error);
      message.error('챌린지 데이터를 불러오지 못했습니다.');
    }
  };

  // 일정 삭제
  const handleDeleteEvent = async (id) => {
    const isConfirmed = window.confirm('챌린지를 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3065/calendar/${id}`);
        message.success('챌린지가 삭제되었습니다.');
        setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id !== id));
      } catch (error) {
        console.error('챌린지 삭제 실패:', error);
        message.error('챌린지 삭제에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // 일정 날짜 형식화
  const formatRange = (start, end) => {
    const format = 'YY.MM.DD(dd)';
    return `${dayjs(start).format(format)} ~ ${dayjs(end).format(format)}`;
  };

  return (
    <>
      <style>{`
        h3 {
          font-size: 20px;
          font-weight: bold;
        }
        .ant-divider-horizontal {
          margin: 15px 0;
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
          backgroundColor: '#ffffff',
          padding: '20px 200px 25px 200px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <h3 style={{ marginBottom: '0px' }}>진행 중인 챌린지</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
              gap: '10px',
            }}
          >
            <Button key="generate" type="primary" onClick={handleAddEvent}>챌린지 생성</Button>
          </div>
        </div>
        <Divider />

        {schedules.map(schedule => (
          <div key={schedule.id}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ display: 'inline', marginBottom: '-2%' }}>{schedule.title}</h3>
                <span style={dateStyle}>{formatRange(schedule.startDate, schedule.endDate)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 'auto',
                  flexDirection: 'row',
                  gap: '10px',
                }}
              >
                <Button type="primary" onClick={() => handleChangeEvent(schedule.id)}>챌린지 수정</Button>
                <Button onClick={() => handleDeleteEvent(schedule.id)}>챌린지 삭제</Button>
              </div>
            </div>
            <span style={dateView}>{schedule.content}</span>
            <Divider />
          </div>
        ))}
        <Button type="primary" htmlType="submit" block onClick={seeMore}>더보기</Button>
      </div>
    </>
  );
};

export default EventScheduleList;