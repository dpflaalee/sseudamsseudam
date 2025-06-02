import React from 'react';
import { Divider, DatePicker, Input, Form, Button, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const dateView = {
  color: '#807E7E',
};

const date = {
  color: '#807E7E',
  fontSize: '13px',
};

const EventScheduleList = () => {
  const [form] = Form.useForm();
  return (
    <>
      <style>{`
        h3 {
          font-size: 20px;
          font-weight: bold;
        }
        .ant-form-item {
          margin-bottom: 15px !important;
        }
        .ant-divider-horizontal {
        margin: 15px 0;
        }
      `}</style>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%',  backgroundColor: '#ffffff', padding: '20px 200px 25px 200px', }} >
        <div style={{display: 'flex'}}>
          <h3 style={{ marginBottom: '0px'}}>5월 일정</h3>
          <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '0%', gap: '10px'}}>
            <Button type="primary">이벤트 생성</Button><LeftOutlined /><RightOutlined />
        </div>
      </div>
      <Divider />
        <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '0%', marginRight: '0%', gap: '10px'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3 style={{display: 'inline', marginBottom: '-2%'}}>메가주 일산</h3>
            <span style={date}>NN.NN.NN(D) ~ NN.NN.NN(D)</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '0%', flexDirection: 'row', gap: '10px'}}>
            <Button type="primary">이벤트 수정</Button><Button>이벤트 삭제</Button>
          </div>
        </div>
        <span style={dateView}>반려동물과 함께하는 특별한 축제, 2025 메가주 일산에 여러분을 초대합니다🎉
        최신 반려용품, 건강·영양, 훈련·교육 등 다양한 브랜드와 이벤트가 한자리에!
        반려동물과 함께 새로운 제품과 서비스를 직접 체험하며, 다가오는 5월 잊지 못할 소중한 추억을 만들어보세요❤️</span>
      </div>
    </>
  );
};

export default EventScheduleList;