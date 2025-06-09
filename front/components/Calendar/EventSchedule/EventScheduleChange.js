import React from 'react';
import { Divider, DatePicker, Input, Form, Button } from 'antd';

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const EventScheduleChange = () => {
  const [form] = Form.useForm();

  return (
    <>
      <style>{`
        .ant-form-item {
          margin-bottom: 15px !important;
        }
      `}</style>
      <div
        style={{
          padding: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <Form {...formItemLayout} form={form} initialValues={{}}>
          <Form.Item>
            <span style={{ fontSize: 25, fontWeight: 500 }}>일정 수정</span>
          </Form.Item>
          <Divider style={{ marginBottom: '15px auto', marginTop: 0, width: '100%' }} />
          <Form.Item
            name="title"
            rules={[{ required: true, message: '일정명을 입력하세요!' }]}
            style={{ width: '100%' }}
          >
            <Input placeholder="일정명" />
          </Form.Item>
          <Form.Item
            name="content"
            rules={[{ required: true, message: '일정 설명을 입력하세요!' }]}
            style={{ width: '100%' }}
          >
            <Input.TextArea placeholder="일정 설명" />
          </Form.Item>
          <Form.Item
            name="range"
            rules={[{ required: true, message: '시작일과 종료일을 선택하세요!' }]}
          >
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block>
              수정하기
            </Button>
          </Form.Item>
          <Form.Item>
            <Button block>취소</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EventScheduleChange;
