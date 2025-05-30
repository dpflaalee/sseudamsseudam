import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import {
  MailOutlined,
  HomeOutlined,
  NotificationOutlined,
  SearchOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined
} from "@ant-design/icons";
=======
import { MailOutlined,  HomeOutlined,  NotificationOutlined, SearchOutlined,  TeamOutlined, BellOutlined, UserOutlined,} from "@ant-design/icons";
>>>>>>> origin/SH_0529
import { Avatar, Dropdown, Menu } from "antd";
const { SubMenu } = Menu;
<<<<<<< HEAD

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}
=======
function getItem(label, key, icon, children) { return { key, icon, children, label };}
>>>>>>> origin/SH_0529

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
=======
    const handleResize = () => { setIsMobile(window.innerWidth <= 768); };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {  window.removeEventListener("resize", handleResize); };
>>>>>>> origin/SH_0529
  }, []);

  const items = [
    getItem("공지", "1", <NotificationOutlined />),
    getItem("홈", "2", <HomeOutlined />),
    getItem("그룹", "sub1", <TeamOutlined />, [
<<<<<<< HEAD
      getItem("Group1", "g1"),
      getItem("Group2", "g2")
    ]),
    getItem("알림", "4", <BellOutlined />),
    getItem("검색", "5", <SearchOutlined />),
    getItem("채팅", "6", <MailOutlined />)
=======
      getItem("Group1", "1"),
      getItem("Group2", "2"),
    ]),
    getItem("알림", "4", <BellOutlined />),
    getItem("검색", "5", <SearchOutlined />),
    getItem("채팅", "6", <MailOutlined />),
>>>>>>> origin/SH_0529
  ];

  const profileMenu = (
    <Menu>
      <Menu.Item key="profileUpdate">프로필 수정</Menu.Item>
      <Menu.Item key="logout">로그아웃</Menu.Item>
      <Menu.Item key="deactivate">탈퇴하기</Menu.Item>
    </Menu>
  );

  return (
<<<<<<< HEAD
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          justifyContent: "flex-start",
          padding: "10px",
          gap: "10px"
        }}
      >
        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Avatar size="large" icon={<UserOutlined />} />
            {!isMobile && (
              <div style={{ marginLeft: "10px" }}>
                <strong>유저명</strong>
                <div style={{ color: "#888" }}>email@com</div>
              </div>
            )}
          </div>
        </Dropdown>

        <Menu
          mode={isMobile ? "horizontal" : "vertical"}
          defaultSelectedKeys={["2"]}
          style={{
            marginTop: "20px",
            width: isMobile ? "auto" : "100%",
            flex: 1
          }}
        >
          {items.map((item) =>
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key} icon={subItem.icon}>
                    {subItem.label}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {isMobile ? null : item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </div>
=======
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: isMobile ? "center" : "flex-start",
        gap: "10px",
      }}
    >
      <Dropdown overlay={profileMenu} trigger={["click"]}>
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <Avatar size="large" icon={<UserOutlined />} />
          {!isMobile && (
            <div style={{ marginLeft: "10px" }}>
              <strong>유저명</strong>
              <div style={{ color: "#888" }}>email@com</div>
            </div>
          )}
        </div>
      </Dropdown>

      <Menu
        mode={isMobile ? "horizontal" : "vertical"}
        defaultSelectedKeys={["2"]}
        style={{
          width: isMobile ? "auto" : "100%",
          flex: 1,
          marginTop: isMobile ? 0 : "20px",
        }}
      >
        {items.map((item) =>
          item.children ? (
            <SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((subItem) => (
                <Menu.Item key={subItem.key} icon={subItem.icon}>
                  {subItem.label}
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              {isMobile ? null : item.label}
            </Menu.Item>
          )
        )}
      </Menu>

>>>>>>> origin/SH_0529
    </div>
  );
};

export default Nav;
