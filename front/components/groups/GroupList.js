import React, { useState } from "react";
import { Row, Col, Typography, Button, Card, Space } from "antd";
import GroupDropDown from "./GroupDropdown";

const { Title, Text } = Typography;

export default function GroupList({ group }) {
  const [open, setOpen] = useState(false);

  const handleGroupClick = () => { setOpen((prev) => !prev); };

  const handleJoin = (e) => {
    e.stopPropagation();
    console.log(`가입 요청: ${group.title}`);
  };

  // 카테고리 공백 추가
  const formattedCategory = group.category ? group.category.join(', ') : '' ;

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
                <Text type="secondary">멤버 수: {group.members}</Text>
              </Col>
            </Row>
            <Text type="secondary">카테고리: {formattedCategory}</Text>
          </Space>
        </Col>
 
        <Col>
          <Button type="primary" onClick={handleJoin}> 가입하기 </Button>
        </Col>
      </Row>

      {/* 드롭다운 정보 */}
      {open&&( <div style={{ marginTop: 12 }}> <GroupDropDown group={group} /> </div> )}
    </Card>
  );
}