import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography, Button, Card, Row, Col, Empty, Modal, message } from "antd";
import dayjs from "dayjs";
import { loadMyPrizes, useMyPrize } from "../../reducers/myPrize";
import { openRandomBox, loadRandomBoxList } from "../../reducers/prize";

const { Text } = Typography;

const MyPrize = () => {
  const dispatch = useDispatch();

  // Redux 상태
  const { User: user } = useSelector((state) => state.user);
  const {
    prizes,
    openRandomBoxLoading,
    openRandomBoxDone,
    latestCoupon,
    loadRandomBoxListLoading,
    loadRandomBoxListError,
  } = useSelector((state) => state.prize);
  const {
    myPrizes,
    loadMyPrizesLoading,
    loadMyPrizesError,
    useMyPrizeLoading,
    useMyPrizeError,
  } = useSelector((state) => state.myPrize);

  // 초기 데이터 로드
  useEffect(() => {
    dispatch(loadRandomBoxList());
    dispatch(loadMyPrizes());
  }, [dispatch]);

  // 랜덤박스 열기 (issuedId 사용)
  const handleOpenRandomBox = useCallback(
    (issuedId) => {
      if (!issuedId) return alert("잘못된 랜덤박스입니다.");
      dispatch(openRandomBox(issuedId));
    },
    [dispatch]
  );

  // 쿠폰 사용
  const handleUsePrize = useCallback(
    (prizeId) => {
      if (!prizeId) return alert("잘못된 쿠폰입니다.");
      if (window.confirm("쿠폰을 사용하시겠습니까?")) {
        dispatch(useMyPrize(prizeId));
      }
    },
    [dispatch]
  );

  // 랜덤박스 사용 결과 모달
  useEffect(() => {
    if (openRandomBoxDone && latestCoupon) {
      message.success("쿠폰이 발급되었습니다!");
      Modal.success({
        title: "🎁 당첨 결과",
        content: (
          <div>
            <p>{latestCoupon.content}</p>
            <p>발급일: {dayjs(latestCoupon.issuedAt).format("YYYY-MM-DD")}</p>
          </div>
        ),
      });
    }
  }, [openRandomBoxDone, latestCoupon]);

  // 필터링
  const validRandomBoxes = prizes.filter((prize) => prize && prize.issuedId && prize.dueAt);
  const validCoupons = myPrizes.filter((coupon) => coupon && coupon.content && coupon.issuedAt);

  // 에러/로딩 처리
  if (loadMyPrizesLoading || loadRandomBoxListLoading) return <Text>로딩 중...</Text>;
  if (loadMyPrizesError || loadRandomBoxListError)
    return (
      <Text type="danger">
        에러 발생: {String(loadMyPrizesError || loadRandomBoxListError)}
      </Text>
    );

  return (
    <>
      {/* 🎁 내 박스 */}
      <Card title="내 박스" style={{ marginBottom: 24 }}>
        <Row gutter={[0, 16]}>
          {validRandomBoxes.length === 0 ? (
            <Empty description="받은 랜덤박스가 없습니다." />
          ) : (
            validRandomBoxes.map((prize) => (
              <Col span={24} key={prize.issuedId}>
                <Card
                  type="inner"
                  title={`${prize.category?.content || "알 수 없음"} 랜덤박스`}
                  extra={
                    <Button
                      type="primary"
                      danger
                      loading={openRandomBoxLoading}
                      onClick={() => handleOpenRandomBox(prize.issuedId)}
                    >
                      사용
                    </Button>
                  }
                >
                  유효기간: {new Date(prize.dueAt).toLocaleDateString()}
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Card>

      {/* 🎟 내 쿠폰함 */}
      <Card title="내 쿠폰함">
        <Row gutter={[0, 16]}>
          {validCoupons.length === 0 ? (
            <Empty description="받은 쿠폰이 없습니다." />
          ) : (
            validCoupons.map((coupon) => (
              <Col span={24} key={coupon.id}>
                <Card
                  type="inner"
                  title={coupon.content}
                  extra={
                    coupon.isRead ? (
                      <Button disabled>사용 완료</Button>
                    ) : (
                      <Button
                        type="primary"
                        loading={useMyPrizeLoading}
                        onClick={() => handleUsePrize(coupon.id)}
                      >
                        사용
                      </Button>
                    )
                  }
                >
                  유효기간: {new Date(coupon.dueAt).toLocaleDateString()}
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
