import React, { useEffect, useState } from 'react';
import { Divider, Button, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
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
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [schedules, setSchedules] = useState([]);

  const handleAddEvent = () => router.push('/schedule/regischedule');
  const handleChangeEvent = (id) => {
    router.push(`/schedule/editschedule?id=${id}`);
  };

  const fetchSchedules = async () => {
    try {
      const res = await axios.get('http://localhost:3065/calendar');
      const filtered = res.data.filter(item => {
        const itemMonth = dayjs(item.startDate).month();
        const itemYear = dayjs(item.startDate).year();
        return (
          itemMonth === currentMonth.month() &&
          itemYear === currentMonth.year()
        );
      });
      filtered.sort((a, b) => a.id - b.id);
      setSchedules(filtered);
    } catch (error) {
      console.error('일정 불러오기 실패:', error);
      message.error('일정 데이터를 불러오지 못했습니다.');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      // DB에서 일정 삭제
      await axios.delete(`http://localhost:3065/calendar/${id}`);
      message.success('이벤트가 삭제되었습니다.');

      // 화면에서 삭제된 이벤트 반영
      setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id !== id));
    } catch (error) {
      console.error('이벤트 삭제 실패:', error);
      message.error('이벤트 삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev.add(1, 'month'));
  };

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
          <h3 style={{ marginBottom: '0px' }}>{currentMonth.format('M월 일정')}</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
              gap: '10px',
            }}
          >
            <Button key="generate" type="primary" onClick={handleAddEvent}>이벤트 생성</Button>
            <LeftOutlined onClick={handlePrevMonth} />
            <RightOutlined onClick={handleNextMonth} />
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
                <Button type="primary" onClick={() => handleChangeEvent(schedule.id)}>이벤트 수정</Button>
                <Button onClick={() => handleDeleteEvent(schedule.id)}>이벤트 삭제</Button>
              </div>
            </div>
            <span style={dateView}>{schedule.content}</span>
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
};

export default EventScheduleList;