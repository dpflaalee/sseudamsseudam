import React, { useState, useEffect } from "react";
import { MailOutlined, HomeOutlined, NotificationOutlined, SearchOutlined, TeamOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from "antd";

const { SubMenu } = Menu;

function getItem(label, key, icon, children) { return { key, icon, children, label }; } 

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => { setIsMobile(window.innerWidth <= 768); };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  const items = [ // 사이드바 항목
    getItem('공지', '1', <NotificationOutlined />),
    getItem('홈', '2', <HomeOutlined />),
    getItem('그룹', 'sub1', <TeamOutlined />, [
      getItem('Group1', '1'),
      getItem('Group2', '2'),
    ]),
    getItem('알림', '4', <BellOutlined />),
    getItem('검색', '5', <SearchOutlined />),
    getItem('채팅', '6', <MailOutlined />)
  ];

  const profileMenu = ( // 유저 드롭다운 항목
    <Menu>
      <Menu.Item key="profileUpdate">프로필 수정</Menu.Item>
      <Menu.Item key="logout">로그아웃</Menu.Item>
      <Menu.Item key="deactivate">탈퇴하기</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      <div style={{ display: 'flex',  flexDirection: isMobile ? 'row' : 'column', justifyContent: 'flex-start',  padding: '10px', gap: '10px', }} >
        
        <Dropdown overlay={profileMenu} trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar size="large" icon={<UserOutlined />} />
            {!isMobile && (
              <div style={{ marginLeft: '10px' }}>
                <strong>유저명</strong>
                <div style={{ color: '#888' }}>email@com</div>
              </div>
            )}
          </div>
        </Dropdown>

        <Menu
          mode={isMobile ? 'horizontal' : 'vertical'}  
          defaultSelectedKeys={['2']}
          style={{ marginTop: '20px', width: isMobile ? 'auto' : '100%', flex: 1 }}
        >
          {items.map((item) => (
            item.children ? (  
              <SubMenu 
                key={item.key} icon={item.icon} title={item.label} >
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key} icon={subItem.icon}>{subItem.label}</Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {isMobile ? null : item.label}  
                {/*모바일상에서 텍스트 숨김 */}
              </Menu.Item>
            )
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
