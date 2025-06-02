export default function handler(req, res) {
  // 예: 랜덤 성공 여부 시뮬레이션
  const isSuccess = Math.random() > 0.5;

  if (isSuccess) {
    return res.status(200).json({
      success: true,
      itemName: "스타벅스 아메리카노 쿠폰",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "랜덤박스 실패", // 클라이언트에서는 사용 안 해도 됨
    });
  }
}
