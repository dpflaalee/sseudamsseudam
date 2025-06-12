import React, { useState, useEffect, useCallback } from "react";
import { MailOutlined, HomeOutlined, NotificationOutlined, SearchOutlined, TeamOutlined, BellOutlined, UserOutlined, BellTwoTone } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "@/reducers/user";
import { LOAD_NOTIFICATION_REQUEST } from "@/reducers/notification";
import { LOAD_USER_GROUPS_REQUEST } from "@/reducers/group";

const { SubMenu } = Menu;

const Nav = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const dispatch = useDispatch();
  const { logOutLoading, user } = useSelector(state => state.user);
  const{userGroups} = useSelector((state)=>state.group);

  useEffect(()=>{
    if(user?.id){ dispatch({type: LOAD_USER_GROUPS_REQUEST});}
  }, [user?.id, dispatch]);

  const onLogout = useCallback(() => {
     dispatch({ type: LOG_OUT_REQUEST }) 
     router.replace('/');
    }, [])

  useEffect(() => {
    const handleResize = () => { setIsMobile(window.innerWidth <= 768); };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <Menu.Item key="profileUpdate">프로필 수정</Menu.Item>
      <Menu.Item key="logout" onClick={onLogout} loading={logOutLoading}>로그아웃</Menu.Item>
      <Menu.Item key="deactivate" style={{ color: 'red' }}>탈퇴하기</Menu.Item>
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

            {userGroups && userGroups.map((group) => (
              <Menu.Item key={`group-${group.id}`} onClick={() => router.push(`/groups/${group.id}`)} >
                {group.title}
              </Menu.Item>
            ))}
          </SubMenu>
          <Menu.Item
            key="notification"
            icon={hasNewNotification ? <BellTwoTone twoToneColor="#eb2f96" /> : <BellOutlined />}
          >
            {!isMobile && "알림"}
          </Menu.Item>
          <Menu.Item key="search" icon={<SearchOutlined />}>{!isMobile && "검색"}</Menu.Item>
          <Menu.Item key="chat" icon={<MailOutlined />}>{!isMobile && "채팅"}</Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
