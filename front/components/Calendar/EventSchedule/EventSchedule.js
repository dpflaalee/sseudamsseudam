//챌린지 view
import React from 'react';
import { Divider, DatePicker, Input, Segmented, Form, Button } from 'antd';

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const EventSchedules = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  return (
    <>
      <style>{`
        h3{
        font-size: 20px;
        font-weight: bold;
        }
        .ant-form-item {
          margin-bottom: 15px !important;
        }
      `}</style>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', backgroundColor: '#ffffff', padding: '20px 200px 25px 200px' }}>
      <h3>일정 추가</h3>
        <Form
          {...formItemLayout}
          form={form}
          variant={variant || 'filled'}
          style={{ /* width: '100%' */ }}
          initialValues={{ variant: 'filled' }}
        >
        <Form.Item
          name="Input"
          rules={[{ required: true, message: 'Please input!' }]}
          style={{
            width: '100%',
          }}
        >
          <Input placeholder="챌린지 네임"/>
        </Form.Item>
        <Form.Item
          name="TextArea"
          rules={[{ required: true, message: 'Please input!' }]}
          style={{
            width: '100%',
          }}
        >
          <Input.TextArea placeholder="챌린지 설명"/>
        </Form.Item>
        <Form.Item>
          <RangePicker showTime style={{
              minWidth: '500',
              display: 'flex',
              justifyContent: 'center',
            }}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block>등록</Button>
        </Form.Item>
        <Form.Item>
          <Button block>취소</Button>
        </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EventSchedules;