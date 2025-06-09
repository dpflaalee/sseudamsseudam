import React, { useState } from "react";
import { List, Avatar, Button, Space, Tag } from "antd";

const dummyJoinRequests = [
  {
    id: 1,
    nickname: "동물사랑꾼",
    status: "pending",
  },
  {
    id: 2,
    nickname: "냥집사",
    status: "pending",
  },
  {
    id: 3,
    nickname: "강아지홀릭",
    status: "pending",
  },
];

const GroupJoinRequests = ({ groupId }) => {
  const [requests, setRequests] = useState(dummyJoinRequests);

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) => req.id === id ? { ...req, status: "approved" } : req  ) ); };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  return (
    <List
      style={{padding:'0 15px'}}
      itemLayout="horizontal"
      dataSource={requests}
      renderItem={(user) => (
        <List.Item
          actions={
            user.status === "pending"
              ? [
                  <Button key="approve" type="primary" onClick={() => handleApprove(user.id)}>
                    승인
                  </Button>,
                  <Button key="reject" danger onClick={() => handleReject(user.id)}>
                    거절
                  </Button>,
                ]
              : [
                  <Tag color={user.status === "approved" ? "green" : "red"}>
                    {user.status === "approved" ? "승인됨" : "거절됨"}
                  </Tag>,
                ]
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar} />}
            title={user.nickname}
          />
        </List.Item>
      )}
    />
  );
};

export default GroupJoinRequests;
