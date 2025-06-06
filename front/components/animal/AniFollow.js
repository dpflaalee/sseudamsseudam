import React, { useState } from "react";
import { Button, Tabs, Avatar, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { aniUnfollow } from "@/reducers/animal";
import { useDispatch } from "react-redux";

const { TabPane } = Tabs;

const initialData = [
  { id: 1, name: "Vishnu Kumar Agrawal", description: "코코의 친구입니다.", isFollowing: true },
  { id: 2, name: "Sonu Gupta", description: "코코의 친구입니다.", isFollowing: true },
  { id: 3, name: "Mohit Goyal", description: "코코의 친구입니다.", isFollowing: true },
  { id: 4, name: "Gaurav Sharma", description: "코코의 친구입니다.", isFollowing: true },
  { id: 5, name: "Vishnu Kumar Agrawal", description: "코코의 친구입니다.", isFollowing: true },
];

const AniList = () => {
  const [tabKey, setTabKey] = useState("followers");
  const [friends, setFriends] = useState(initialData);

  const toggleFollow = (id) => {
    setFriends((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
      )
    );
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 8 }}>
      {/* 상단 아바타 및 이름 */}
      

      {/* 탭 영역 */}
      <Tabs  style={{border: '1px solid #ddd', padding: 10}} defaultActiveKey="followers" onChange={(key) => setTabKey(key)} centered>
        <TabPane tab="팔로잉" key="following">
          {/* <div style={{ textAlign: "center", color: "#999" }}>팔로잉 목록이 없습니다.</div> */}
          <List
      itemLayout="horizontal"
      dataSource={friends.filter(friend => friend.isFollowing)} // ✅ isFollowing이 true인 애들만
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key="unfollow"
              danger
              type="primary"
              onClick={() => toggleFollow(item.id)}
            >
              친구
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={item.name}
            description={item.description}
          />
        </List.Item>
      )}
    />
        </TabPane>
        <TabPane tab="팔로워" key="followers">
          <List
            itemLayout="horizontal"
            dataSource={friends}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key="toggle"
                    type={item.isFollowing ? "primary" : "default"}
                    danger={item.isFollowing}
                    onClick={() => toggleFollow(item.id)}
                  >
                    {item.isFollowing ? "친구" : "친구하기"}
                  </Button>,
                ]}
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
            <Button>친구추천+</Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AniList;
