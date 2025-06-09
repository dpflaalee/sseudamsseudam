import React from "react";
import { useRouter } from "next/router";
import AppLayout from "@/components/AppLayout";
import {
  Avatar,
  Typography,
  Button,
  Card,
  Row,
  Col,
  Calendar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const MyPrize = () => {
  const router = useRouter();

  // category 객체를 받아 category.id로 API 호출
  const openRandomModal = async (category) => {
    try {
      const res = await fetch(`/api/open-random-box?category=${category.id}`, {
        method: 'POST',
        credentials: 'include',
      });
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

  // 예시 데이터: 실제론 백엔드에서 받아서 사용해야 합니다.
  const prizes = [
    {
      id: 1,
      category: { id: 1, content: "강아지" },
      issuedAt: "2025-05-30",
    },
    {
      id: 2,
      category: { id: 2, content: "고양이" },
      issuedAt: "2025-05-30",
    },
  ];

  return (
    <>
      {/* 내 박스 */}
      <Card title="내 박스" style={{ marginBottom: 24 }}>
        <Row gutter={[0, 16]}>
          {prizes.map((prize) => (
            <Col span={24} key={prize.id}>
              <Card
                type="inner"
                title={`${prize.category.content} 랜덤박스`}
                extra={
                  <Button danger onClick={() => openRandomModal(prize.category)}>
                    사용
                  </Button>
                }
              >
                유효기간: {new Date(prize.issuedAt).toLocaleDateString()}
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 내 쿠폰함 */}
      <Card title="내 쿠폰함" style={{ marginBottom: 24 }}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Card
              type="inner"
              title="쿠폰이름"
              extra={<Button type="primary">사용</Button>}
            >
              유효기간: 2025/05/30
            </Card>
          </Col>
          <Col span={24}>
            <Card
              type="inner"
              title="쿠폰이름"
              extra={<Button type="primary">사용</Button>}
            >
              유효기간: 2025/05/30
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default MyPrize;
