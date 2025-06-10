import React, { useEffect } from 'react';
import { Divider, DatePicker, Input, Form, Button, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const ChallengeForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.isAdmin !== 1) {
      alert('권한이 없습니다.');
      router.replace('/main');
    }
  }, [router]);

  const onFinish = async (values) => {
    try {
      const [start, end] = values.range;

      const response = await axios.post('http://localhost:3065/calendar', {
        title: values.title,
        content: values.content,
        startDate: dayjs(start).toISOString(),
        endDate: dayjs(end).toISOString(),
      }, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        message.success('챌린지 등록 완료');
        form.resetFields();
        router.push('/challenge');
      } else {
        message.error('챌린지 등록 실패 (서버 응답 오류)');
      }
    } catch (error) {
      console.error('등록 중 오류:', error);
      message.error('챌린지 등록 실패');
    }
  };

  const handleCancel = () => {
    router.push('/main');
  };

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
      `}</style>
      <Divider />
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '560px', width: '100%', backgroundColor: '#ffffff', padding: '20px 200px 25px 200px'}}>
        <h3>챌린지 추가</h3>
        <Form {...formItemLayout} form={form} onFinish={onFinish}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: '챌린지 이름을 입력하세요.' }]}>
            <Input placeholder="챌린지 이름" />
          </Form.Item>

          <Form.Item
            name="content"
            rules={[{ required: true, message: '챌린지 설명을 입력하세요.' }]}>
            <Input.TextArea placeholder="챌린지 설명" />
          </Form.Item>

          <Form.Item
            name="range"
            rules={[{ required: true, message: '시작일과 종료일을 선택하세요.' }]}>
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>등록</Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="button" onClick={handleCancel} block>취소</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ChallengeForm;
