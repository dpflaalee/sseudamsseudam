import React, { useState, useRef, useEffect, useCallback } from "react";
import { MailOutlined, HomeOutlined, NotificationOutlined, SearchOutlined, TeamOutlined, BellOutlined, UserOutlined, BellTwoTone, AuditOutlined } from "@ant-design/icons";
import styled from 'styled-components';
import { Avatar, Dropdown, Menu, Button, Modal, Card, Skeleton, Input, Form } from "antd";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST, USER_PROFILE_UPDATE_REQUEST } from "@/reducers/user";
import { LOAD_NOTIFICATION_REQUEST } from "@/reducers/notification";
import userInput from "@/hooks/userInput";

const { SubMenu } = Menu;
const UnderlineInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  box-shadow: none;

  &:focus,
  &.ant-input-focused {
    border-bottom: 2px solid #1677ff;
    box-shadow: none;
  }
`;

const Nav = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const dispatch = useDispatch();
  const { logOutLoading, user, imagePaths } = useSelector(state => state.user);
  const [text, onChangeText, setText] = userInput('');
  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST })
    router.replace('/');
  }, [])
  const onUserDelete = useCallback(() => {

  })
  const [modalFlag, setModalFlag] = useState(false);
  const onUserProfileUpdate = useCallback(() => {
    setModalFlag(prev => !prev);
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setModalFlag(true);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const onChange = (checked) => {
    setLoading(!checked);
  };
  const [nickname, setNickname] = useState('홍길동');
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, [nickname])

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    console.log('imageInput.current=', imageInput.current);
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);
  const onChangeImage = useCallback((e) => {
    console.log(`.....`, e.target.files);
    const imageFormData = new FormData();

    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    //   Array.from(e.target.files).forEach((f) => {
    //     console.log('array');
    //     console.log(f);
    //     imageFormData.append('image', f);
    // });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    })
  }, []);
  useEffect(() => {
    const handleResize = () => { setIsMobile(window.innerWidth <= 768); };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  //이미지 미리보기
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  const onSubmitForm = useCallback(() => {
    //1. 글 있는지 확인 
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.')
    }
    //2. content - text 으로 넘기기
    //3. image - 이미지도 있다면
    const formData = new FormData();
    imagePaths.forEach((i) => { formData.append('image', i) });
    formData.append('content', text);

    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
      data: formData   //##
    });
  }, [text, imagePaths]);
  const handleClick = ({ key }) => {
    if (key === 'notice') router.push('/adminNoti');
    if (key === 'home') router.push('/main');
    if (key === 'groupHome') router.push('/groups');
    if (key === 'notification') router.push('/notification');
    if (key === 'search') router.push('/search');
    if (key === 'chat') router.push('/chat');
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profileUpdate" onClick={showModal}>프로필 수정</Menu.Item>
      <Menu.Item key="logout" onClick={onLogout} loading={logOutLoading}>로그아웃</Menu.Item>
      <Menu.Item key="deactivate" onClick={onUserDelete} style={{ color: 'red' }}>탈퇴하기</Menu.Item>
    </Menu>
  );

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  // 새로 온 알림
  const { hasNewNotification } = useSelector(state => state.notification);
  dispatch({
    type: LOAD_NOTIFICATION_REQUEST
  }, [dispatch]);

  // 내가 관리자인지?
  const me = useSelector(state => state.user);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", justifyContent: "flex-start", gap: "10px", }} >
        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer", marginTop: "20px", padding: "15px", }} >
            <Avatar size="large" icon={<UserOutlined />} />
            {!isMobile && user && (
              <div style={{ marginLeft: "10px" }}>
                <strong>{user?.nickname}</strong>
                <div style={{ color: "#888" }}>{user?.email}</div>
              </div>
            )}
          </div>
        </Dropdown>

        <Menu
          mode={isMobile ? "horizontal" : "inline"}
          selectedKeys={[]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleClick}
          style={{
            width: isMobile ? "auto" : "100%",
            borderRight: "none",
            background: "transparent",
          }}
        >
          <Menu.Item key="notice" icon={<NotificationOutlined />}>{!isMobile && "공지"}</Menu.Item>
          <Menu.Item key="home" icon={<HomeOutlined />}> {!isMobile && "홈"} </Menu.Item>
          <SubMenu key="group" icon={<TeamOutlined />} title={!isMobile && "그룹"}>
            <Menu.Item key="groupHome" style={{ fontWeight: 'bold' }}>그룹 홈</Menu.Item>
            <Menu.Item key="group2">Group2</Menu.Item>
          </SubMenu>
          <Menu.Item
            key="notification"
            icon={hasNewNotification ? <BellTwoTone twoToneColor="#eb2f96" /> : <BellOutlined />}
          >
            {!isMobile && "알림"}
          </Menu.Item>
          <Menu.Item key="search" icon={<SearchOutlined />}>{!isMobile && "검색"}</Menu.Item>
          <Menu.Item key="chat" icon={<MailOutlined />}>{!isMobile && "채팅"}</Menu.Item>
          {(me.user && me.user.isAdmin) ? <Menu.Item key="admin" onClick={() => router.push('/admin')} icon={<AuditOutlined />}>{!isMobile && "관리자 페이지"}</Menu.Item> : ''}
        </Menu>
      </div>
      {modalFlag &&
        <Form onFinish={onSubmitForm}>
          <div>
            {/* <Button type="primary" onClick={showModal}>
            Open Modal
            </Button> */}
            <Modal title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }} key="footer-buttons">
                  <Form.Item style={{ margin: 0 }}>
                    <input
                      type="file"
                      name="image"
                      multiple
                      hidden
                      ref={imgRef}
                      style={{ display: 'none' }}
                      onChange={saveImgFile}
                    />
                    <Button onClick={() => imgRef.current?.click()}>프로필편집</Button>
                  </Form.Item>
                  <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    프로필변경
                  </Button>
                  <Button key="back" onClick={handleCancel}>
                    나가기
                  </Button>
                </div>,
              ]}
            >
              <Card
                style={{
                  width: 450,
                  marginTop: 16,
                }}
                actions={[

                ]}
              >
                <Card.Meta
                  // avatar={<Avatar  src="https://joeschmoe.io/api/v1/random" />}
                  avatar={<Avatar src={imgFile ? imgFile : "/images/user.png"} />}
                  //avatar={<Avatar  icon={<UserOutlined />} />}
                  title={<div style={{ fontSize: '15px', color: 'black' }}>{nickname}</div>}
                  description=""
                  style={{
                    marginBottom: 16,
                  }}
                />
                <UnderlineInput value={nickname} onChange={onChangeNickname} placeholder="기존 닉네임 노출(해당 칸에 입력하여 변경)" />
              </Card>
            </Modal>
          </div>
        </Form>
      }
    </div>

  );
};

export default Nav;
