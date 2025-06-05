import React, { useState } from 'react';
import { Divider, Button, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const dateView = {
  color: '#807E7E',
};

const date = {
  color: '#807E7E',
  fontSize: '13px',
};

const EventScheduleList = () => {
  const router = useRouter();

  const handleAddEvent = () => {
    router.push('/schedule');
  };

  const handleChangeEvent = () => {
    router.push('/changeschedule');
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
          <h3 style={{ marginBottom: '0px' }}>5월 일정</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
              gap: '10px',
            }}
          >
            <Button key="generate" type="primary" onClick={handleAddEvent}>이벤트 생성</Button><LeftOutlined /><RightOutlined />
          </div>
        </div>
        <Divider />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ display: 'inline', marginBottom: '-2%' }}>메가주 일산</h3>
            <span style={date}>NN.NN.NN(D) ~ NN.NN.NN(D)</span>
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
            <Button type="primary" onClick={handleChangeEvent}>이벤트 수정</Button>
            <Button>이벤트 삭제</Button>
          </div>
        </div>
        <span style={dateView}>반려동물과 함께하는 특별한 축제, 2025 메가주 일산에 여러분을 초대합니다🎉 최신 반려용품, 건강·영양, 훈련·교육 등 다양한 브랜드와 이벤트가 한자리에! 반려동물과 함께 새로운 제품과 서비스를 직접 체험하며, 다가오는 5월 잊지 못할 소중한 추억을 만들어보세요❤️
        </span>
      </div>
    </>
  );
};

export default EventScheduleList;
