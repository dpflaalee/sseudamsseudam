import React from "react";
import { Button, Popover } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';

const AnimalProfileCard = () => {
  const {animals} = useSelector((state) => state.animal);
  
  if (!animals || animals.length === 0) {
    return <p>등록된 동물 프로필이 없습니다.</p>;
  }
  const popoverContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Button type="text">친구하기</Button>
      <Button type="text" danger>친구끊기</Button>
    </div>
  );
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      {animals.map((profile, idx) => {
        const { aniName, aniAge, aniProfile } = profile;
    return (
      <div
        key={idx}
        style={{
          width: 250,
          border: "1px solid #eee",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 20,
          background: "#fff",
        }}
      >
        <div style={{ backgroundColor: "#f8dada", padding: "20px", position: "relative" }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              backgroundColor: "#ccc",
              overflow: "hidden",
              marginBottom: 10,
            }}
          >
            {aniProfile && (
              <img
                src={aniProfile}
                alt="프로필 사진"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          <h3 style={{ margin: 0, fontWeight: "bold" }}>{aniName}</h3>
          <p style={{ margin: "4px 0" }}>{aniAge}살</p>
        </div>

        <div
          style={{
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button size="small">수정</Button>
          <Button size="small" danger>
            삭제
          </Button>
          <Popover content={popoverContent}>
            <EllipsisOutlined style={{ fontSize: 18, cursor: "pointer" }} />
          </Popover>
        </div>
      </div>
    );
  })}
    </div>
  );
};
export default AnimalProfileCard;
