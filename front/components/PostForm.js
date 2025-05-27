import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';
import UserInput from '../hooks/UserInput';  

const PostForm = () => {
  return (
    <Form layout="vertical" style={{ margin: '3%' }}>
    <Form.Item  label="TheJoa Write"  name="text">  
      <Input.TextArea placeholder='게시글을 적어주세요'
        maxLength={200} />
    </Form.Item>
      <Form.Item>
        <Input type="file" name="image" multiple hidden />
        <Button>이미지업로드</Button>
        <Button type="primary" style={{ float: 'right' }}
          htmlType='submit'>POST</Button>
      </Form.Item> 
    </Form>
  );
};

export default PostForm;
