import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Row, Col, Typography, Button, Card, Space } from "antd";
import GroupDropDown from "./GroupDropdown";

const { Title, Text } = Typography;

export default function GroupList({ group }) {
  const router = useRouter();
  const {me} = useSelector((state)=>state.user);
  const [open, setOpen] = useState(false);

  const handleGroupClick = () => { setOpen((prev) => !prev); };

  const handleJoin = (e) => {
    e.stopPropagation();
    console.log(`가입 요청: ${group.title}`);
    //가입 요청 로직 추가 예정
  };

  const handleEnterGroup = (e) => { e.stopPropagation(); router.push(`/groups/${group.id}`); } // 가입한 그룹일 시 해당 그룹으로 이동
  //현재 유저가 이 그룹에 가입했는지 확인
  const isMember = group.groupmembers?.some( (member) => member.userId === me?.id );

  // 카테고리 공백 추가
  const formattedCategory = group.Categories?.map((c)=>c.content).join(", ") || "없음"; 
  //멤버 수 계산
  const memberCount = group.groupmembers?.length || 0;  

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
      {open&&( <div style={{ marginTop: 12 }}> <GroupDropDown group={group} /> </div> )}
    </Card>
  );
}