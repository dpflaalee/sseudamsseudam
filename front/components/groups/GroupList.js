import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Button, Card, Space, Spin } from "antd";
import GroupDropDown from "./GroupDropdown";
import axios from "axios";
import { LOAD_MEMBERS_REQUEST, APPLY_GROUP_REQUEST, JOIN_GROUP_REQUEST, JOIN_GROUP_RESET, APPLY_GROUP_RESET } from "@/reducers/group";
import { ADD_NOTIFICATION_REQUEST } from '../../reducers/notification';
import NOTIFICATION_TYPE from "../../../shared/constants/NOTIFICATION_TYPE";

const { Title, Text } = Typography;

export default function GroupList({ g }) {
  const router = useRouter(); const dispatch = useDispatch();
  const { members, loadMembersLoading, loadMembersError } = useSelector((state) => state.group)
  const [isMember, setIsMember] = useState(false);
  const [groupLeader, setGroupLeader] = useState(false);
  const { user } = useSelector(state => state.user); //console.log("로그인한유저정보", user.id);  // 1
  const [group, setGroup] = useState(g);
  const [open, setOpen] = useState(false);
  const { joinGroupDone, joinGroupError, applyGroupDone, applyGroupError } = useSelector(state => state.group);

  const formattedCategory = group?.Categories?.map((c) => c.content).join(", ") || "없음"; // 카테고리 공백 추가  
  const memberCount = group?.groupmembers ? new Set(group.groupmembers.map(m => m.id)).size : 0;//멤버 수 계산

  //그룹 멤버 로드 요청 및 가입상태 확인
  useEffect(() => {
    if (group && group?.id) { dispatch({ type: LOAD_MEMBERS_REQUEST, data: group?.id }); }
  }, [group?.id, dispatch]);

  //멤버상태변경
  useEffect(() => {
    //console.log(">>>>>>>>>>멤버상태변경의 members", members);
    if (members && members.length > 0) {
      const memberFound = group?.groupmembers?.some((groupMember) => groupMember.id === user.id);
      setIsMember(memberFound);
      //console.log("----------------멤버상태 변경됐냐",memberFound);

    }
    /// 알림 그룹 리더 찾기
    if (group?.groupmembers && group?.groupmembers.length > 0) {
      const groupLeader = members.find((members) => members.isLeader === true); // GroupMember의 isLeader 확인
      setGroupLeader(groupLeader);
    }
  }, [members, user, group?.groupmembers]);

  useEffect(() => {
    if (joinGroupDone !== undefined) {
      //console.log('joinGroupDone 상태 확인:', joinGroupDone);
      if (joinGroupDone) {
        alert("가입이 완료되었습니다.");
        dispatch({ type: JOIN_GROUP_RESET }); // 상태 리셋
        router.push(`/groups/${group?.id}`);
      }
      if (joinGroupError) {
        alert(joinGroupError);
        dispatch({ type: JOIN_GROUP_RESET });
      }
    }
  }, [joinGroupDone, joinGroupError, group?.id, dispatch]);

  useEffect(() => {
    if (applyGroupDone !== undefined) {
      console.log('applyGroupDone 상태 확인:', applyGroupDone);
      if (applyGroupDone) {
        alert("가입 신청이 완료되었습니다!");
        dispatch({ type: APPLY_GROUP_RESET }); // 상태 리셋
      }
      if (applyGroupError) {
        alert(applyGroupError);
        dispatch({ type: APPLY_GROUP_RESET });
      }
    }
  }, [applyGroupDone, applyGroupError, dispatch]);

  const handleGroupClick = () => { setOpen((prev) => !prev); };

  const handleEnterGroup = (e) => { e.stopPropagation(); router.push(`/groups/${group.id}`); } // 가입한 그룹일 시 해당 그룹으로 이동

  const handleJoin = async (e) => {
    e.stopPropagation();
    if (isMember) { alert('이미 가입된 그룹입니다. 그룹으로 이동합니다.'); return router.push(`/gorups/${group.id}`) };




    try {
      if (group.OpenScopeId === 1) {
        dispatch({
          type: JOIN_GROUP_REQUEST, data: { groupId: group.id },
          notiData: {
            targetId: group.id,
            SenderId: user?.id,
            ReceiverId: groupLeader.id,
          }
        });
      } else {
        dispatch({
          type: APPLY_GROUP_REQUEST, data: { groupId: group.id },
          notiData: {
            targetId: group.id,
            SenderId: user?.id,
            ReceiverId: groupLeader.id,
          }
        });
      }

    } catch (error) { alert("가입 중 오류발생"); }
  };


  //////////////////////////////////////////////////////////////////////////////////////
  return (
    <Card
      onClick={handleGroupClick}
      style={{ width: "100%", marginBottom: 8 }}
      bodyStyle={{ padding: 16 }}
    >
      {loadMembersLoading ? (<Spin size="large" />) : loadMembersError ? (<div>Error:{loadMembersError}</div>) : (
        <Row justify="space-between" align="middle">
          <Col>
            <Space direction="vertical" size={4}>
              <Row align="middle" gutter={8}>
                <Col>
                  <Title level={5} style={{ margin: 0 }}>
                    {group?.title}
                  </Title>
                </Col>
                <Col>
                  <Text type="secondary">멤버 수: {memberCount}</Text>
                </Col>
              </Row>
              <Text type="secondary">카테고리: {formattedCategory}</Text>
            </Space>
          </Col>

          <Col>
            {isMember ? (
              <Button type="primary" onClick={handleEnterGroup}> 이동하기 </Button>
            ) : (
              <Button type="primary" onClick={handleJoin}> 가입하기 </Button>
            )}
          </Col>
        </Row>
      )}  {/*삼황연산자 끝 */}
      {/* 드롭다운 정보 */}
      {open && (<div style={{ marginTop: 12 }}> <GroupDropDown group={group} /> </div>)}
    </Card>
  );
}