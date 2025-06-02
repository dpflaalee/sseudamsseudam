import React from 'react';
import { Divider, DatePicker, Input, Segmented, Form, Button } from 'antd';

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const EventScheduleChange = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  return (
    <>
      <style>{`
        .ant-form-item {
          margin-bottom: 15px !important;
        }
      `}</style>
      <div style={{ padding: '20px 0px 20px 0px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
      <Form
        {...formItemLayout}
        form={form}
        variant={variant || 'filled'}
        initialValues={{ variant: 'filled' }}
      >
      <Form.Item>
        <span style={{fontSize: '25px', fontWeight: '500'}}>일정 수정</span>
      </Form.Item>
      <Divider style={{ marginBottom: '15px auto', marginTop: '0px', width: '100%' }}/>
        <Form.Item
          name="Input"
          rules={[{ required: true, message: 'Please input!' }]}
          style={{
            width: '100%',
          }}
        >
          <Input placeholder="일정명"/>
        </Form.Item>
        <Form.Item
          name="TextArea"
          rules={[{ required: true, message: 'Please input!' }]}
          style={{
            width: '100%',
          }}
        >
          <Input.TextArea placeholder="일정 설명"/>
        </Form.Item>
        <Form.Item>
          <RangePicker showTime style={{
              minWidth: '500',
              display: 'flex',
              justifyContent: 'center',
            }}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block>수정하기</Button>
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
