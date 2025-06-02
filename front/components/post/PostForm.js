import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button, Avatar, Select, Row, Col, Space, Modal, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../../reducers/post';
import userInput from '../../hooks/userInput';  

const PostForm = () => {

  const { TextArea } = Input;
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => { setIsModalOpen(true);};
  const handleOk = () => { setIsModalOpen(false); };
  const handleCancel = () => { setIsModalOpen(false); };

  const { imagePaths , addPostLoading, addPostDone } = useSelector((state) => state.post);
  const imageInput = useRef();

  const dispatch = useDispatch();
  const [text, onChangeText, setText] = userInput(''); 

  useEffect(() => { 
    if (addPostDone) { setText('');  }
  } , [addPostDone]);

  const onFormSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: { content: text },
    });
  },[text]);
  
  return (
    <Form layout="vertical" style={{ margin: '3%' }} encType="multipart/form-data" onFinish={onFormSubmit}>
      <Form.Item name="text">
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* 상단: 아바타 + 공개범위 */}
          <Row align="middle" gutter={8}>
            <Col>
              <Avatar icon={<UserOutlined />} />
              {/* 또는 <Avatar src="프로필이미지URL" /> */}
            </Col>
            <Col>
              <Select defaultValue="public" style={{ width: 120 }}>
                <Option value="public">전체공개</Option>
                <Option value="friends">친구공개</Option>
                <Option value="private">비공개</Option>
              </Select>
            </Col>
          </Row>

          {/* 본문 입력 */}
          <TextArea
            placeholder="게시글을 적어주세요"
            maxLength={200} value={text}   onChange={onChangeText}
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Space>
      </Form.Item>
      <Form.Item>
        <Input type="file" name="image" multiple hidden />
        <Button>사진</Button>
        <Button>지도</Button>

        <div style={{ float: 'right' }}>
          <Button onClick={showModal} style={{ marginRight: 8 }}>
            카테고리
          </Button>
          <Button type="primary" htmlType="submit" loading={addPostLoading}>
            POST
          </Button>
        </div>
      </Form.Item>
      <Modal
        title="카테고리 선택"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="확인"
        cancelText="취소"
      >
        {/* 여기에 카테고리 선택 내용 작성 */}
        <p><Checkbox>강아지</Checkbox><Checkbox>고양이</Checkbox></p>
      </Modal>
    </Form>  
  );
};

export default PostForm;
