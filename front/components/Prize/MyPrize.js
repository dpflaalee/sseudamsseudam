import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography, Button, Card, Row, Col, Empty, Modal, message } from "antd";
import dayjs from "dayjs";
import { loadMyPrizes, useMyPrize } from "../../reducers/myPrize";
import { openRandomBox, loadRandomBoxList } from "../../reducers/prize";
import Barcode from "react-barcode";

const { Text } = Typography;

const MyPrize = () => {
  const dispatch = useDispatch();

  // Redux 상태
  const { User: user } = useSelector((state) => state.user);
  const {
    prizes,
    randomBoxes,
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

  // 모달 상태
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    dispatch(loadRandomBoxList());
    dispatch(loadMyPrizes());
  }, [dispatch]);

  useEffect(() => {
    if (openRandomBoxDone) {
      dispatch(loadRandomBoxList());
      dispatch(loadMyPrizes());
    }
  }, [openRandomBoxDone, dispatch]);

  // 랜덤박스 열기
  const handleOpenRandomBox = useCallback(
    (issuedId) => {
      if (!issuedId) return alert("잘못된 랜덤박스입니다.");

      const usedBox = myPrizes.find(
        (coupon) => coupon.issuedId === issuedId && coupon.usedAt && coupon.isRead
      );

      if (usedBox) {
        return message.warning("이미 사용한 랜덤박스입니다.");
      }

      dispatch(openRandomBox(issuedId));
    },
    [dispatch, myPrizes]
  );

  // 쿠폰 사용
  const handleUsePrize = useCallback(
    (prizeId) => {
      const coupon = myPrizes.find((c) => c.id === prizeId);
      if (!coupon) return;

      if (coupon.usedAt && coupon.isRead) {
        return message.warning("이미 사용한 쿠폰입니다.");
      }

      setSelectedCoupon(coupon);
      setIsModalVisible(true);
    },
    [myPrizes]
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

  // 유효한 랜덤박스 필터링
  const validRandomBoxes = randomBoxes.filter((prize) => {
    return (
      prize &&
      prize.issuedId &&
      !myPrizes.find(
        (coupon) => coupon.issuedId === prize.issuedId && coupon.usedAt && coupon.isRead
      )
    );
  });

  // 유효한 쿠폰 필터링
  const validCoupons = myPrizes.filter((coupon) => coupon && coupon.content && coupon.issuedAt);

  // 로딩/에러 처리
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
                />
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
                  title={
                    <>
                      <div>{coupon.content}</div>
                      {coupon.issuedReason && (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          발급 사유: {coupon.issuedReason}
                        </Text>
                      )}
                    </>
                  }
                  extra={
                    coupon.usedAt && coupon.isRead ? (
                      <>
                        <Button disabled>사용 완료</Button>
                        <Text type="secondary" style={{ marginLeft: 8 }}>
                          이미 사용된 쿠폰입니다.
                        </Text>
                      </>
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
                  <br />
                  <Text type="warning">쿠폰은 조기 마감될 수 있습니다.</Text>
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

      {/* ✅ 상태 기반 쿠폰 사용 모달 */}
      {selectedCoupon && (
        <Modal
          title="쿠폰을 사용하시겠습니까?"
          visible={isModalVisible}
          onOk={() => {
            dispatch(useMyPrize(selectedCoupon.id));
            setIsModalVisible(false);
          }}
          onCancel={() => setIsModalVisible(false)}
          okText="사용"
          cancelText="취소"
        >
          <p>
            <strong>상품:</strong> {selectedCoupon.content}
          </p>
          <p>
            <strong>유효기간:</strong>{" "}
            {new Date(selectedCoupon.dueAt).toLocaleDateString()}
          </p>
          {selectedCoupon.barcode && (
            <div style={{ marginTop: 12 }}>
              <Barcode value={selectedCoupon.barcode} />
              <Text type="secondary">{selectedCoupon.barcode}</Text>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default MyPrize;
