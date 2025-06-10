import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AppLayout from "@/components/AppLayout";
import { Avatar, Typography, Button, Card, Row, Col, Empty } from "antd";
import { loadMyPrizes } from "../../reducers/myPrize"; // 액션 임포트

const { Title, Text } = Typography;

const MyPrize = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { myPrizes, loadMyPrizesLoading, loadMyPrizesError } = useSelector(
    (state) => state.myPrize
  );

  useEffect(() => {
    dispatch(loadMyPrizes());
  }, [dispatch]);

  const openRandomModal = async (category) => {
    if (!category || !category.id) {
      alert("랜덤박스 카테고리 정보가 없습니다.");
      return;
    }

    try {
      const res = await fetch(`/api/random-box/open/${category.id}`, {
        method: "POST",
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("서버 응답 실패");

      const data = await res.json();
      if (data.success) {
        router.push(
          `/mypage/RandomBoxResult?status=success&item=${encodeURIComponent(
            data.itemName
          )}`
        );
      } else {
        router.push("/mypage/RandomBoxResult?status=fail");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      router.push("/mypage/RandomBoxResult?status=fail");
    }
  };

  // 유효한 랜덤박스만 필터링
  const validPrizes = myPrizes.filter(
    (prize) => prize && prize.content && prize.issuedAt
  );

  if (loadMyPrizesLoading) return <Text>로딩 중...</Text>;
  if (loadMyPrizesError)
    return (
      <Text type="danger">
        에러 발생:{" "}
        {typeof loadMyPrizesError === "object"
          ? loadMyPrizesError.message || JSON.stringify(loadMyPrizesError)
          : String(loadMyPrizesError)}
      </Text>
    );

  return (
    <>
      {/* 🎁 내 박스 */}
      <Card title="내 박스" style={{ marginBottom: 24 }}>
        <Row gutter={[0, 16]}>
          {validPrizes.length === 0 ? (
            <Empty description="받은 랜덤박스가 없습니다." />
          ) : (
            validPrizes.map((prize) => {
              console.log("🎯 Prize 데이터:", prize);
              console.log("👉 카테고리 정보:", prize.category); 
              return (
                <Col span={24} key={prize.id}>
                  <Card
                    type="inner"
                    title={`${prize.category?.content || "알 수 없음"} 랜덤박스`}
                    extra={
                      <Button danger onClick={() => openRandomModal(prize.category)}>
                        사용
                      </Button>
                    }
                  >
                    유효기간: {new Date(prize.dueAt).toLocaleDateString()}
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Card>

      {/* 🎟 내 쿠폰함 */}
      <Card title="내 쿠폰함">
        <Row gutter={[0, 16]}>
          {validPrizes.length === 0 ? (
            <Empty description="받은 쿠폰이 없습니다." />
          ) : (
            validPrizes.map((prize) => (
              <Col span={24} key={prize.id}>
                <Card
                  type="inner"
                  title={prize.content}
                  extra={<Button type="primary">사용</Button>}
                >
                  유효기간: {new Date(prize.dueAt).toLocaleDateString()}
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Card>
    </>
  );
};

export default MyPrize;
