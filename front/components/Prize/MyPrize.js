import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AppLayout from "@/components/AppLayout";
import { Avatar, Typography, Button, Card, Row, Col } from "antd";
import { loadMyPrizes } from "../../reducers/myPrize"; // 액션 임포트  

const { Title, Text } = Typography;

const MyPrize = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // 리덕스에서 내 쿠폰 데이터 가져오기
  const { myPrizes, loadMyPrizesLoading, loadMyPrizesError } = useSelector((state) => state.myPrize);

  useEffect(() => {
    dispatch(loadMyPrizes()); // 컴포넌트가 마운트되면 내 쿠폰 데이터 불러오기
  }, [dispatch]);

  // 랜덤박스 열기
  const openRandomModal = async (category) => {
    try {
      const res = await fetch(`/api/open-random-box?category=${category.id}`, {
        method: "POST",
        credentials: "include",
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

  if (loadMyPrizesLoading) return <Text>로딩 중...</Text>;
  if (loadMyPrizesError) return <Text>에러 발생: {loadMyPrizesError}</Text>;

  return (
    <>
      {/* 내 박스 */}
      <Card title="내 박스" style={{ marginBottom: 24 }}>
        <Row gutter={[0, 16]}>
          {myPrizes.map((prize) => (
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
          {myPrizes.map((prize) => (
            <Col span={24} key={prize.id}>
              <Card
                type="inner"
                title={prize.content}
                extra={<Button type="primary">사용</Button>}
              >
                유효기간: {new Date(prize.issuedAt).toLocaleDateString()}
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default MyPrize;
