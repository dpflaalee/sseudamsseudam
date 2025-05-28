import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';
import UserInput from '../hooks/UserInput';  

const PostForm = () => {

  const {imagePaths} = useSelector(state => state.post);
  const imageInput = useRef();

  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    console.log("......" + e.target.value);
    setText(e.target.value);
  },[]);
  const onFormSubmit = useCallback(() => {
    dispatch(ADD_POST_REQUEST);
    setText('');
  },[]);
  
  return (
    <Form layout="vertical" style={{ margin: '3%' }} encType="multipart/form-data" onFinish={onFormSubmit}>
    <Form.Item  label="TheJoa Write"  name="text">  
      <Input.TextArea placeholder='게시글을 적어주세요'
        maxLength={200} />
    </Form.Item>
      <Form.Item>
        <Input type="file" name="image" multiple hidden />
        <Button>이미지업로드</Button>
        <Button type="primary" style={{ float: 'right' }}
          htmlType='submit' onChange={onChangeText}>POST</Button>
      </Form.Item> 
    </Form>
  );
};

export default PostForm;
