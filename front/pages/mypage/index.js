import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppLayout from "@/components/AppLayout";
import {
  Avatar,
  Typography,
  Button,
  Card,
  Row,
  Col,
} from "antd";
import { UserOutlined, EllipsisOutlined } from "@ant-design/icons";
import MyPrize from "@/components/prize/MyPrize";
import { Dropdown, Menu } from "antd";

const { Title, Text } = Typography;

const Index = () => {
  const [activeSection, setActiveSection] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.showPrize === "true") {
      setActiveSection("prize");
    }
  }, [router.query]);

  const openRandomModal = async () => {
    try {
      const res = await fetch("/api/open-random-box");
      if (!res.ok) throw new Error("서버 응답 실패");

      const data = await res.json();
      if (data.success) {
        router.push(`/mypage/RandomBoxResult?status=success&item=${encodeURIComponent(data.itemName)}`);
      } else {
        router.push("/mypage/RandomBoxResult?status=fail");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      router.push("/mypage/RandomBoxResult?status=fail");
    }
  };

  return (
    <AppLayout>
      {/* 상단 프로필 */}
      <Card style={{ background: '#e6f7ff', marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col span={18}>
            <Row align="middle" gutter={16}>
              <Col>
                <Avatar size={80} icon={<UserOutlined />} />
              </Col>
              <Col>
                <Title level={4}>사용자명</Title>
                <Text>30일 팔로잉 | 22 팔로워 | 123개 게시글</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Col>
          <Row justify="end" align="middle" gutter={[8, 0]}>
            <Col>
              <Button type="primary" onClick={() => setActiveSection("prize")}>
                내 쿠폰함
              </Button>
            </Col>
            <Col>
              <Button onClick={() => setActiveSection("places")}>내 장소</Button>
            </Col>
            <Col>
              <Button onClick={() => setActiveSection("challenge")}>챌린지 현황</Button>
            </Col>
            <Col>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="report" onClick={() => router.push("/admin/complain")}> { /* 수정필요!! 신고 폼 */}
                      신고 페이지로 이동   { /* 수정필요!! 관리자신고페이지말고 신고하기 폼으로 가게 */}
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
                trigger={["click"]}
              >
                <EllipsisOutlined
                  style={{ fontSize: 20, cursor: "pointer" }}
                />
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Card>

      {/* 조건부 렌더링 */}
      {activeSection === "prize" && <MyPrize openRandomModal={openRandomModal} />}
      {/* 필요 시 다른 섹션도 여기에 추가 */}
    </AppLayout>
  );
};

export default Index;
