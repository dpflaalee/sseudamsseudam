import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Avatar, Typography, Button, Card, Row, Col, Empty } from "antd";
import { loadMyPrizes, useMyPrize} from "../../reducers/myPrize"; // 랜덤박스 열기 액션 추가
import { openRandomBox, loadRandomBoxList, CategoryRandomBoxes, loadCategoryRandomBoxes } from "../../reducers/prize";

const { Text } = Typography;

const MyPrize = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 사용자 정보
  const user = useSelector(state => state.user);
  const userNickname = user.User?.nickname;

  // 🎟️ 내 쿠폰 관련 상태
  const {
    myPrizes,
    loadMyPrizesLoading,
    loadMyPrizesError,
    useMyPrizeLoading,
    useMyPrizeError,
  } = useSelector((state) => state.myPrize);  

// 🎁 랜덤박스 관련 상태
  const {
    prizes,
    openRandomBoxLoading,
    openRandomBoxDone,
    openRandomBoxError,
    loadRandomBoxListLoading,
    loadRandomBoxListDone,
    loadRandomBoxListError,
    loadCategoryRandomBoxesLoading,
    loadCategoryRandomBoxesDone,
    loadCategoryRandomBoxesError,
    categoryBoxes: categoryRandomBoxes, 
    categoryBoxes,
  } = useSelector((state) => state.prize);

  
  const userId = user?.User?.id; // `user` 정보에서 `userId` 가져오기

  useEffect(() => {
    dispatch(loadMyPrizes());
    dispatch(loadRandomBoxList());
    if (userId) {
    dispatch(loadCategoryRandomBoxes(userId));
  } else {
    console.log('사용자가 로그인하지 않았습니다. 카테고리 랜덤박스 로딩을 건너뜁니다.');
  }
}, [dispatch, userId]);


  // 랜덤박스 열기 함수
  const openRandomModal = async (category) => {
    if (!category || !category.id) {
      alert("랜덤박스 카테고리 정보가 없습니다.");
      return;
    }

    dispatch(openRandomBox(category.id)); // 랜덤박스 열기 액션 디스패치

    if (openRandomBoxLoading) {
      alert("랜덤박스 열기 중...");
      return;
    }

    if (openRandomBoxError) {
      alert("랜덤박스를 여는 데 실패했습니다.");
      return;
    }

    if (openRandomBoxDone) {
      // 랜덤박스 열기 성공 시 리다이렉트
      router.push(
        `/mypage/RandomBoxResult?status=success&item=${encodeURIComponent(category.content)}`
      );
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

  // prizes가 배열인지 확인
  const isPrizesArray = Array.isArray(prizes);

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
                      loading={openRandomBoxLoading}
                      onClick={() => openRandomModal(prize.category)}
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
          {validPrizes.length === 0 ? (
            <Empty description="받은 쿠폰이 없습니다." />
          ) : (
            validPrizes.map((prize) => (
              <Col span={24} key={prize.id}>
                <Card
                  type="inner"
                  title={prize.prize?.content || "알 수 없음"} 
                  extra={
                    prize.isRead ? (
                      <Button disabled>사용 완료</Button>
                    ) : (
                      <Button
                        type="primary"
                        loading={useMyPrizeLoading}
                        onClick={() => handleUsePrize(prize.id)} // prize.id 전달
                      >
                        사용
                      </Button>
                    )
                  }
                >
                  유효기간: {new Date(prize.prize?.dueAt || prize.dueAt).toLocaleDateString()}
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

      {/* 랜덤박스 리스트 상태 */}
      <Card title="랜덤박스 리스트" style={{ marginBottom: 24 }}>
        <Row gutter={[0, 16]}>
          {loadRandomBoxListLoading ? (
            <Text>랜덤박스 리스트 로딩 중...</Text>
          ) : loadRandomBoxListError ? (
            <Text type="danger">
              랜덤박스 리스트를 불러오는 데 실패했습니다: {String(loadRandomBoxListError)}
            </Text>
          ) : categoryRandomBoxes?.length > 0 ? (
            categoryRandomBoxes.map((box) => (
              <Col span={24} key={box.categoryId}>
                <Card
                  type="inner"
                  title={`${box.categoryName} 랜덤박스`}
                  extra={
                    <Button
                      danger
                      loading={openRandomBoxLoading}
                      onClick={() => openRandomModal({ id: box.categoryId, content: box.categoryName })}
                    >
                      사용
                    </Button>
                  }
                >
                  포함 상품:{" "}
                  {box.prizes.map((p) => p.content).join(", ")}
                </Card>
              </Col>
            ))
          ) : (
            <Empty description="랜덤박스가 없습니다." />
          )}
        </Row>
      </Card>

      <Card title="카테고리별 랜덤박스">
        {loadCategoryRandomBoxesLoading ? (
          <Text>로딩 중...</Text>
        ) : (
          categoryBoxes.map((box) => (
            <Card key={box.category} type="inner" title={`${box.category} 랜덤박스`}>
              {box.items.length > 0 ? (
                box.items.map((prize) => (
                  <Card key={prize.id} style={{ marginBottom: 12 }}>
                    <div>{prize.content}</div>
                    <Button
                      danger
                      loading={openRandomBoxLoading}
                      onClick={() => openRandomModal({ id: prize.categoryId, content: box.category })}
                    >
                      사용
                    </Button>
                  </Card>
                ))
              ) : (
                <Empty description="상품 없음" />
              )}
            </Card>
          ))
        )}
      </Card>



      {/* 랜덤박스 열기 상태 */}
      {openRandomBoxLoading && <Text>랜덤박스를 여는 중입니다...</Text>}
      {openRandomBoxError && (
        <Text type="danger">랜덤박스를 여는 데 실패했습니다: {openRandomBoxError}</Text>
      )}
    </>
  );
};

export default MyPrize;
