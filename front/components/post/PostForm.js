import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button, Avatar, Select, Row, Col, Space, Modal, Checkbox, Card, Divider, } from 'antd';
import { UserOutlined, UploadOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';
import userInput from '../../hooks/userInput';
//import { v } from '@faker-js/faker/dist/airline-BUL6NtOJ';
// 카테고리
import { LOAD_CATEGORIES_REQUEST } from '@/reducers/category';
import { Tabs } from 'antd';
const { TabPane } = Tabs;


const PostForm = ({ groupId, isGroup = false }) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => { setIsModalOpen(true); };
  const handleOk = () => { setIsModalOpen(false); };
  const handleCancel = () => { setIsModalOpen(false); };
  const [openScope, setOpenScope] = useState('public');

  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const router = useRouter();
  const [text, onChangeText, setText] = userInput('');
  const user = useSelector(state => state.user);
  const [link, setLink] = useState(null);


  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  useEffect(() => {
    const storedLink = localStorage.getItem('kakaoMapLink');
    if (storedLink) {
      setLink(storedLink);
      localStorage.removeItem('kakaoMapLink');  // 한 번만 사용되도록 삭제
    }
  }, []);

  useEffect(() => {
    if (link) {
      setText(prev => prev ? `${prev}\n[location](${link})` : `[location](${link})`);
    }
  }, [link]);

  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) return alert('게시글을 작성하세요.');

    const isAdmin = user.user.isAdmin;

    const formData = new FormData();
    imagePaths.forEach((i) => formData.append('image', i));
    formData.append('content', text);
    formData.append('openScope', openScope);
    if (isGroup && groupId) { formData.append('groupId', groupId); }
    selectedCategories.forEach((catId) => {
      formData.append('categoryIds', catId); // key 이름은 서버에서 받는 이름에 맞춰서
    });
    // 🐛 콘솔 확인
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
      isAdmin: isAdmin,
    });
  }, [text, imagePaths, groupId]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);
  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({ type: UPLOAD_IMAGES_REQUEST, data: imageFormData });
  }, []);
  const onRemoveImage = useCallback((index) => () => {
    dispatch({ type: REMOVE_IMAGE, data: index });
  }, []);
  const goToMap = () => {
    router.push('/map/kakao');
  };
  const openLink = () => {
    // 카카오 지도 링크로 새 탭에서 열기
    if (link) {
      window.open(link, '_blank');
    }
  };  

  // 카테고리
  useEffect(() => {
    dispatch({ type: LOAD_CATEGORIES_REQUEST });
  }, []);
  const { categories } = useSelector(state => state.category);
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <Card style={{ margin: '3%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <Form layout="vertical" encType="multipart/form-data" onFinish={onSubmitForm}>
        <Form.Item>
          <Row align="middle" justify="space-between" gutter={16} wrap={false}>
            <Col>
              <Avatar size="large" icon={<UserOutlined />} />
            </Col>
            <Col flex="auto">
              <Space>
                <Select value={openScope} onChange={(value) => setOpenScope(value)} style={{ width: 150 }}>
                  <Option value="public">전체 공개</Option>
                  <Option value="private">나만 보기</Option>
                  <Option value="follower">팔로워 공개</Option>
                </Select>
                <Button onClick={() => setIsModalOpen(true)}>카테고리</Button>
              </Space>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <TextArea
            placeholder="무슨 일이 있었나요?"
            maxLength={300}
            value={text}
            onChange={onChangeText}
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>

        <Form.Item>
          <Row justify="space-between" align="middle" style={{ flexWrap: 'wrap' }}>
            <Col>
              <Space>
                <Button icon={<UploadOutlined />} onClick={onClickImageUpload}>
                  사진 업로드
                </Button>
                <Button icon={<EnvironmentOutlined />} onClick={goToMap}>
                  지도
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button type="primary" htmlType="submit" loading={addPostLoading}>
                  POST
                </Button>
              </Space>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <input
            ref={imageInput}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={onChangeImage}
          />
        </Form.Item>

        {Array.isArray(imagePaths) && imagePaths.length > 0 && (
          <>
            <Divider>업로드된 이미지</Divider>
            <Row gutter={[16, 16]}>
              {imagePaths.map((v, i) => (
                <Col key={v}>
                  <Card
                    cover={<img alt={`업로드된 이미지 ${i + 1}`} src={`http://localhost:3065/${v}`} style={{ objectFit: 'cover', height: 180 }} />}
                    actions={[<Button type="link" danger onClick={onRemoveImage(i)}>제거</Button>]}
                    style={{ width: 200 }}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Form>

      {/* 카테고리 */}
      <Modal
        title="카테고리 선택"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okText="확인"
        cancelText="취소"
      >
        <Tabs defaultActiveKey="animal">
          <TabPane tab="카테고리" key="animal">
            <Checkbox.Group style={{ width: '100%' }}
              value={selectedCategories}
              onChange={setSelectedCategories}>
              {categories
                .filter((v) => v.isAnimal)
                .map((v) => (
                  <Row key={v.id}>
                    <Col span={12}>
                      <Checkbox value={v.id}>{v.content}</Checkbox>
                    </Col>
                  </Row>
                ))}
            </Checkbox.Group>
          </TabPane>

          <TabPane tab="챌린지" key="general">
            <Checkbox.Group style={{ width: '100%' }}
              value={selectedCategories}
              onChange={setSelectedCategories}>
              {categories
                .filter((v) => !v.isAnimal)
                .map((v) => (
                  <Row key={v.id}>
                    <Col span={12}>
                      <Checkbox value={v.id}>{v.content}</Checkbox>
                    </Col>
                  </Row>
                ))}
            </Checkbox.Group>
          </TabPane>
        </Tabs>
      </Modal>
      {/* E 카테고리 */}

    </Card>
  );
};

export default PostForm;
