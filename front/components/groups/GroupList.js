import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Button, Card, Space, Spin } from "antd";
import GroupDropDown from "./GroupDropdown";
import axios from "axios";
import { LOAD_MEMBERS_REQUEST } from "@/reducers/group";
import { ADD_NOTIFICATION_REQUEST } from './../../reducers/notification';
import NOTIFICATION_TYPE from "../../../shared/constants/NOTIFICATION_TYPE";
//// E 알림

const { Title, Text } = Typography;

export default function GroupList({ group }) {
  const router = useRouter(); const dispatch = useDispatch();
  const {members, loadMembersLoading, loadMembersError} = useSelector((state)=>state.group)
  const [isMember, setIsMember] = useState(false);
  //console.log("멤버배열정상이니............", members);

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(state => state?.user || null);

  const handleGroupClick = () => { setOpen((prev) => !prev); };

  const handleJoin = async (e) => {
    e.stopPropagation();
    console.log(`가입 요청: ${group.title}`);
    try{
      //공개그룹 가입
      if(group.OpenScopeId===1){
        const response = await axios.post(`/api/groups/${group.id}/join`);
        if(response.status===200){alert('그룹에 가입되었습니다.'); router.push(`/groups/${group.id}`);}
      }else{
        //비공개그룹 가입
        const response = await axios.post(`/api/groups/${group.id}/request`);
        if(response.status === 200){ alert('가입 신청이 전송되었습니다.'); }
      }
    }catch(error){console.error("가입 요청 중 오류 발생", error); alert("가입 요청 중 오류가 발생했습니다.");}

    //// 알림
    // dispatch({
    //   type: ADD_NOTIFICATION_REQUEST,
    //   data: {
    //     notiType: NOTIFICATION_TYPE.GROUPAPPLY,
    //     SenderId: user.user.id,
    //     ReceiverId: group.User.id,
    //     targetId: group.id,
    //   }
    // });
    /// E 알림
  };

  const handleEnterGroup = (e) => { e.stopPropagation(); router.push(`/groups/${group.id}`); } // 가입한 그룹일 시 해당 그룹으로 이동

  //현재 유저가 이 그룹에 가입했는지 확인
  //const isMember = Array.isArray(group.groupmembers) && group.groupmembers.length > 0 && group.groupmembers.some(member => member.userId === me?.id);
  //const isMember = Array.isArray(group.groupmembers) && group.groupmembers.some(member => member.userId === me?.id);
  const checkMembership = async ()=>{
    try{
      const response = await axios.get(`/api/groups/${group.id}/members/me`);
      if(response.status ===200 ){ setIsMember(true); }
    }catch(error){ console.error(error); setIsMember(false); }
  }

  //그룹 멤버 로드 요청
  useEffect( ( )=>{ 
    console.log("그룹 있니.............", group);
    console.log("멤버 있니.............", group.groupmembers);
    if(group.id){dispatch({type: LOAD_MEMBERS_REQUEST, data:group.id});}
    checkMembership(); 
  }, [group.id, dispatch] );
  if(loadMembersLoading){ return <Spin size="large"/> }
  if(loadMembersError){return <div>Error:{loadMembersError}</div>}

  // 카테고리 공백 추가
  const formattedCategory = group.Categories?.map((c)=>c.content).join(", ") || "없음"; 
  //멤버 수 계산
  const memberCount = group.groupmembers ? new Set(group.groupmembers.map(m => m.id)).size : 0;

//////////////////////////////////////////////////////////////////////////////////////
  return (
    <Card
      onClick={handleGroupClick}
      style={{ width: "100%", marginBottom: 8 }}
      bodyStyle={{ padding: 16 }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Space direction="vertical" size={4}>
            <Row align="middle" gutter={8}>
              <Col>
                <Title level={5} style={{ margin: 0 }}>
                  {group.title}
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
          {isMember?(
            <Button type="primary" onClick={handleEnterGroup}> 이동하기 </Button>
          ):(
            <Button type="primary" onClick={handleJoin}> 가입하기 </Button>
          )}


        </Col>
      </Row>

      {/* 드롭다운 정보 */}
      {open && (<div style={{ marginTop: 12 }}> <GroupDropDown group={group} /> </div>)}
    </Card>
  );
}