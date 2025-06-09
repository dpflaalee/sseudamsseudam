import React from "react";
import { Card, Row, Col, Button, Modal } from "antd";
import Barcode from "react-barcode";

// coupons: 쿠폰 배열, openRandomModal: 박스 사용 콜백 (부모에서 전달)
const MyPrize = ({ coupons, openRandomModal }) => {
  const handleUseBox = (categoryId) => {
    openRandomModal(categoryId); // 부모에서 categoryId 처리
  };

  const handleCouponUse = (couponId) => {
    // 쿠폰 사용 로직 (API 호출 등)
    // 여기서 성공/실패 모달 띄워도 됨
    Modal.success({
      title: "쿠폰 사용 성공",
      content: `쿠폰 ID ${couponId}가 성공적으로 사용되었습니다.`,
      okText: "확인",
    });
  };

  return (
    <>
      {/* 내 박스 */}
      <Card title="내 박스" style={{ marginBottom: 24 }}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Card
              type="inner"
              title="강아지 랜덤박스"
              extra={<Button danger onClick={() => handleUseBox(1)}>사용</Button>}
            >
              유효기간: 2025/06/30
              <br />
              <span style={{ color: "#888" }}>
                사용 시 일정 확률로 상품을 받을 수 있습니다.
              </span>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              type="inner"
              title="고양이 랜덤박스"
              extra={<Button danger onClick={() => handleUseBox(2)}>사용</Button>}
            >
              유효기간: 2025/06/30
              <br />
              <span style={{ color: "#888" }}>
                사용 시 일정 확률로 상품을 받을 수 있습니다.
              </span>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 내 쿠폰함 */}
      <Card title="내 쿠폰함" style={{ marginBottom: 24 }}>
        <Row gutter={[0, 16]}>
          {coupons && coupons.length > 0 ? (
            coupons.map((coupon) => (
              <Col span={24} key={coupon.id}>
                <Card
                  type="inner"
                  title={coupon.content}
                  extra={
                    <Button type="primary" onClick={() => handleCouponUse(coupon.id)}>
                      사용
                    </Button>
                  }
                >
                  유효기간: {new Date(coupon.dueAt).toLocaleDateString()}
                  <br />
                  <Barcode value={coupon.barcode} />
                  <br />
                  <span style={{ color: "#888" }}>
                    발급 사유: {coupon.issuedReason}
                  </span>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>쿠폰이 없습니다.</Col>
          )}
        </Row>
      </Card>
    </>
  );
};

export default MyPrize;
