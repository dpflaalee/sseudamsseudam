import React, { useEffect, useState } from 'react';
import { Divider, Button, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import Calendar from './ChallengeCalendar';
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

const UserChallengeList = () => {
  // const router = useRouter();
  const [challenges, setChallenges] = useState([]);

const fetchChallenges = async () => {
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
    setChallenges(filtered);
  } catch (error) {
    console.error('챌린지 불러오기 실패:', error);
    message.error('챌린지 데이터를 불러오지 못했습니다.');
  }
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
          <h3 style={{ marginBottom: '0px' }}>내 챌린지 참여현황</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
              gap: '10px',
            }}
          >
          </div>
        </div>
        <Divider />

        {challenges.map(challenge => (
          <div key={challenge.id}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ display: 'inline', marginBottom: '-2%' }}>{challenge.title}</h3><span style={dateStyle}>{formatRange(challenge.startDate, challenge.endDate)}</span>
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
              <Calendar />
              </div>
            </div>
            <span style={dateView}>{challenge.content}</span>
            <Divider />
            <Form.Item>
            <Button type="primary" htmlType="submit" block onClick={seeMore}>더보기</Button>
          </Form.Item>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserChallengeList;
