import React, { useEffect } from "react";
import { List, Avatar, Button, Space, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {  APPROVE_JOIN_REQUEST,  REJECT_JOIN_REQUEST,  LOAD_JOIN_REQUESTS_REQUEST,} from "@/reducers/group"; 

const GroupJoinRequests = ({ groupId }) => {
  const dispatch = useDispatch();
  
  const { joinRequests, joinRequestsLoading, joinRequestsError } = useSelector( (state) => state.group );

  useEffect(() => {
    if (groupId) {
      // 그룹 아이디에 맞는 가입 요청 목록 불러오기
      dispatch({ type: LOAD_JOIN_REQUESTS_REQUEST, data: groupId, });
    }
  }, [groupId, dispatch]);

  const handleApprove = (requestId) => {
    //쿼리 스트링으로 넘기기
    dispatch({ type: APPROVE_JOIN_REQUEST, data: { groupId, requestId } });
  };

  const handleReject = (requestId) => {
    //쿼리 스트링으로 넘기기
    dispatch({ type: REJECT_JOIN_REQUEST, data: { groupId, requestId } });  };

  if (joinRequestsLoading) return <div>로딩 중...</div>;
  if (joinRequestsError) return <div>에러 발생!</div>;

  return (
    <List
      style={{ padding: "0 15px" }}
      itemLayout="horizontal"
      dataSource={joinRequests}
      renderItem={(user) => (
        <List.Item
          actions={
            user.status === "pending"
              ? [
                  <Button
                    key="approve"
                    type="primary"
                    onClick={() => handleApprove(user.id)}
                  >
                    승인
                  </Button>,
                  <Button
                    key="reject"
                    danger
                    onClick={() => handleReject(user.id)}
                  >
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
