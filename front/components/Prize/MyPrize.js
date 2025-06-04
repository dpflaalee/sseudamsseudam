import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
} from "antd";
import Barcode from "react-barcode";

// props: openRandomModal
const MyPrize = ({ openRandomModal }) => {
  const handleCouponUse = () => {
    const isSuccess = Math.random() > 0.3; // 70% 확률로 성공

    if (isSuccess) {
      Modal.success({
          title: "교환권 발급 성공",
          content: (
            <div style={{ textAlign: "center" }}>
              <p>온/오프라인 교환권이 발급되었습니다.</p>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=YOUR_COUPON_CODE"
                alt="QR 코드"   // 임시 QR코드 이미지 사용했음
                style={{ margin: "16px 0" }}
              />
              <p>QR 코드를 매장에서 제시하거나 마이페이지에서 확인하세요.</p>
            </div>
          ),
          okText: "확인",
        });
    }else {
      Modal.error({
        title: "쿠폰 사용 실패",
        content: "일시적인 오류가 발생했습니다. 다시 시도해주세요.",
        okText: "닫기",
      });
    }
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
              extra={<Button danger onClick={openRandomModal}>사용</Button>}
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
              extra={<Button danger onClick={openRandomModal}>사용</Button>}
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
          <Col span={24}>
            <Card
              type="inner"
              title="쿠폰이름"
              extra={<Button type="primary" onClick={handleCouponUse}>사용</Button>}
            >
              유효기간: 2025/06/30
              <br />
              <span style={{ color: "#888" }}>
                발급 사유: 작성한 게시글이 주간 좋아요 1위로 선정되어 지급된 랜덤박스를 통해 발급된 쿠폰입니다.
              </span>
              <br />
              <span style={{ color: "#888" }}>
                쿠폰이 조기 마감될 수 있습니다. 사용에 유의 바랍니다.
              </span>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              type="inner"
              title="쿠폰이름"
              extra={<Button type="primary" onClick={handleCouponUse}>사용</Button>}
            >
              유효기간: 2025/06/30
              <br />
              <span style={{ color: "#888" }}>
                발급 사유: 지난주 좋아요 순위 2위에 선정되어 지급된 랜덤박스에서 발급된 쿠폰입니다.
              </span>
              <br />
              <span style={{ color: "#888" }}>
                쿠폰이 조기 마감될 수 있습니다. 사용에 유의 바랍니다.
              </span>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default MyPrize;
