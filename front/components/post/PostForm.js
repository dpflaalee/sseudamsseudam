import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button, Avatar, Select, Row, Col, Space, Modal, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';
import userInput from '../../hooks/userInput';

const PostForm = ({ groupId, isGroup = false }) => { // 그룹용 추가코드

  const { TextArea } = Input;
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => { setIsModalOpen(true); };
  const handleOk = () => { setIsModalOpen(false); };
  const handleCancel = () => { setIsModalOpen(false); };
  const [openScope, setOpenScope] = useState('public');

  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const [text, onChangeText, setText] = userInput('');

  useEffect(() => {
    if (addPostDone) { setText(''); }
  }, [addPostDone]);

  // 관리자 공지 알림
  const user = useSelector(state => state.user);
  const isAdmin = user.user.isAdmin;

  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) { return alert('게시글을 작성하세요.'); }
    const formData = new FormData();
    imagePaths.forEach((i) => { formData.append('image', i) });
    formData.append('content', text);
    formData.append('openScope', openScope);
    if (isGroup && groupId) { formData.append('groupId', groupId); } // 그룹용 추가코드
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
      isAdmin: isAdmin,
    });
  }, [text, imagePaths, groupId]); // 그룹용 추가코드

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImage = useCallback((e) => {
    console.log('.....images', e.target.files);
    const imageFormData = new FormData();

    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    });
  }, []);

  return (
    <Form layout="vertical" style={{ margin: '3%' }} encType="multipart/form-data" onFinish={onSubmitForm}>
      <Form.Item name="text">
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* 상단: 아바타 + 공개범위 */}
          <Row align="middle" gutter={8}>
            <Col>
              <Avatar icon={<UserOutlined />} />
              {/* 또는 <Avatar src="프로필이미지URL" /> */}
            </Col>
            <Col>
              <Select value={openScope} onChange={(value) => setOpenScope(value)} style={{ width: 120 }}>
                <Option value="public">전체공개</Option>
                <Option value="private">나만 보기</Option>
                <Option value="follower">팔로워공개</Option>
                <Option value="group">그룹공개</Option>
              </Select>
            </Col>
          </Row>

          {/* 본문 입력 */}
          <TextArea
            placeholder="게시글을 적어주세요"
            maxLength={200} value={text} onChange={onChangeText}
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Space>
      </Form.Item>
      <Form.Item>
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImage}
        />
        <Button onClick={onClickImageUpload}>사진 업로드</Button>
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
      <div>
        {Array.isArray(imagePaths) ? imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }} >
            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} />
            <div><Button onClick={onRemoveImage(i)} >제거</Button></div>
          </div>
        )) : null}
      </div>
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
