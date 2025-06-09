import React, { useState, useEffect } from "react";
import { Button, Tabs, Avatar, List, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  LOAD_ANIFOLLOWERS_REQUEST,
  LOAD_ANIFOLLOWINGS_REQUEST,
  LOAD_RECOMMENDED_ANIMALS_REQUEST,
  ANIFOLLOW_REQUEST,
  ANIUNFOLLOW_REQUEST,
} from "@/reducers/animal";

const { TabPane } = Tabs;

const AniFollow = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const imageBaseUrl = 'http://localhost:3065/uploads/animalProfile';
  const {
    followers = [],
    followings = [],
    recommendedAnimals = [],
    loadRecommendedAnimalsLoading,
    loadAnifollowersLoading,
    loadAnifollowingsLoading,
  } = useSelector((state) => state.animal);

  const handleFollowToggle = (targetAnimalId, isFollowing) => {
    if (!id) return; // 내 동물 ID가 없으면 중단

    if (isFollowing) {
      dispatch({
        type: ANIUNFOLLOW_REQUEST,
        data: { targetAnimalId: Number(targetAnimalId), myAnimalId: Number(id) },
      });
    } else {
      dispatch({
        type: ANIFOLLOW_REQUEST,
        data: { targetAnimalId: Number(targetAnimalId), myAnimalId: Number(id) },
      });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch({ type: LOAD_ANIFOLLOWINGS_REQUEST, data: id });
      dispatch({ type: LOAD_ANIFOLLOWERS_REQUEST, data: id });
      dispatch({ type: LOAD_RECOMMENDED_ANIMALS_REQUEST, data: id });
    }
  }, [id]);
  useEffect(() => {
  }, [recommendedAnimals]);

  const renderList = (data, isLoading, emptyMessage) => {
    if (isLoading) return <Spin />;
    if (!data || data.length === 0) {
      return (
        <div style={{ textAlign: "center", color: "#999", padding: 20 }}>
          {emptyMessage}
        </div>
      );
    }

    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="friend" type={item.isFollowing ? "default" : "primary"}
                danger={item.isFollowing}
                onClick={() => handleFollowToggle(item.id, item.isFollowing)}>
                {item.isFollowing ? "친구" : "친구 맺기"}
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                item.aniProfile ? (
                  <Avatar src={`${imageBaseUrl}/${item.aniProfile}`} />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )
              }
              title={item.aniName || '이름 없음'}
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 8 }}>
      <Tabs defaultActiveKey="followers" centered>
        <TabPane tab="팔로잉" key="followings">
          {renderList(followings, loadAnifollowingsLoading, "팔로잉한 동물이 없습니다.")}
        </TabPane>
        <TabPane tab="팔로워" key="followers">
          {renderList(followers, loadAnifollowersLoading, "나를 팔로우한 동물이 없습니다.")}
        </TabPane>
      </Tabs>
      <div style={{ marginTop: 24 }}>
        <h3>친구 추천</h3>
        {renderList(recommendedAnimals, loadRecommendedAnimalsLoading, "추천할 친구가 없습니다.")}
      </div>
    </div>
  );
};

export default AniFollow;
