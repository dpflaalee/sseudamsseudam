import React, { useState } from "react";
import { Button, Tabs, Avatar, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const dummyData = [
  {
    id: 1,
    name: "Vishnu Kumar Agrawal",
    description: "코코의 친구입니다.",
  },
  {
    id: 2,
    name: "Sonu Gupta",
    description: "코코의 친구입니다.",
  },
  {
    id: 3,
    name: "Mohit Goyal",
    description: "코코의 친구입니다.",
  },
  {
    id: 4,
    name: "Gaurav Sharma",
    description: "코코의 친구입니다.",
  },
  {
    id: 5,
    name: "Vishnu Kumar Agrawal",
    description: "코코의 친구입니다.",
  },
];

const AniList = () => {
  const [tabKey, setTabKey] = useState("followers");

  return (
    <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 8 }}>
      {/* 상단 아바타 및 이름 */}
      <div style={{ display: "flex", justifyContent: "left", marginBottom: 16 }}>
        <div style={{ textAlign: "center", marginRight: 40 }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 8 }}>헤이즐넛</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 8 }}>노른자</div>
        </div>
      </div>

      {/* 탭 영역 */}
      <Tabs defaultActiveKey="followers" onChange={(key) => setTabKey(key)} centered>
        <TabPane tab="팔로잉" key="following">
          <div style={{ textAlign: "center", color: "#999" }}>팔로잉 목록이 없습니다.</div>
        </TabPane>
        <TabPane tab="팔로워" key="followers">
          <List
            itemLayout="horizontal"
            dataSource={dummyData}
            renderItem={(item) => (
              <List.Item
                actions={[<Button key="add" type="primary">친구</Button>]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <Button>친구하기</Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AniList;
