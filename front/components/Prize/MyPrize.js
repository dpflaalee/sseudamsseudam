import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Avatar, Typography, Button, Card, Row, Col, Empty } from "antd";
import { loadMyPrizes, useMyPrize } from "../../reducers/myPrize";

// 신고
import ComplainForm from "../complains/ComplainForm";
import TARGET_TYPE from "../../../shared/constants/TARGET_TYPE";

const { Text } = Typography;

const MyPrize = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 신고자
  const user = useSelector(state => state.user);
  const userNickname = user.User?.nickname;

  const {
    myPrizes,
    loadMyPrizesLoading,
    loadMyPrizesError,
    useMyPrizeLoading,
    useMyPrizeError,
  } = useSelector((state) => state.myPrize);

  useEffect(() => {
    dispatch(loadMyPrizes());
  }, [dispatch]);

  // 랜덤박스 열기 함수 (기존 코드 유지)
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

  // 쿠폰 사용 함수
  const handleUsePrize = useCallback(
    (prizeId) => {
      if (!prizeId) {
        alert("잘못된 쿠폰입니다.");
        return;
      }

      if (window.confirm("쿠폰을 사용하시겠습니까?")) {
        dispatch(useMyPrize(prizeId));
      }
    },
    [dispatch]
  );

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
            validPrizes.map((prize) => (
              <Col span={24} key={prize.id}>
                <Card
                  type="inner"
                  title={`${prize.category?.content || "알 수 없음"} 랜덤박스`}
                  extra={
                    <Button
                      danger
                      onClick={() => openRandomModal(prize.category)}
                    >
                      사용
                    </Button>
                  }
                >
                  유효기간: {new Date(prize.dueAt).toLocaleDateString()}
                </Card>
                
                {/*
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="report" onClick={() => setOpen(true)}>
                        신고하기
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <EllipsisOutlined style={{ fontSize: 20, cursor: "pointer" }} />
                </Dropdown>
                {/* 신고 모달 */} {/*}
                {
                  open && (
                    <ComplainForm
                      open={open}
                      targetId={prize.id}
                      TARGET_TYPE={TARGET_TYPE.RANDOMBOX}
                      targetUserNickname={userNickname}
                      onClose={() => setOpen(false)}
                    />
                  )
                }
                {/* E 신고 모달 */}

              </Col>
            ))
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
                  extra={
                    prize.isRead ? (
                      <Button disabled>사용 완료</Button>
                    ) : (
                      <Button
                        type="primary"
                        loading={useMyPrizeLoading}
                        onClick={() => handleUsePrize(prize.id)} // prize.id를 제대로 전달
                      >
                        사용
                      </Button>
                    )
                  }
                >
                  유효기간: {new Date(prize.dueAt).toLocaleDateString()}
                </Card>
              </Col>
            ))
          )}
        </Row>
        {useMyPrizeError && (
          <Text type="danger" style={{ marginTop: 8 }}>
            쿠폰 사용 중 오류: {useMyPrizeError}
          </Text>
        )}
      </Card>
    </>
  );
};

export default MyPrize;
