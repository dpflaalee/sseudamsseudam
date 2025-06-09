import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popover, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { REMOVE_ANIPROFILE_REQUEST } from '@/reducers/animal';

const AnimalProfileCard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedAnimal } = useSelector((state) => state.animal); // Redux에서 선택된 동물 가져오기
  const imageBaseUrl = 'http://localhost:3065/uploads/animalProfile'; 

  if (!selectedAnimal) return null;

  const { id, aniName, aniAge, aniProfile, Followings, Followers } = selectedAnimal;

  const onClickDelete = () => {
    if (window.confirm(`${aniName} 프로필을 정말 삭제하시겠습니까?`)) {
      dispatch({
        type: REMOVE_ANIPROFILE_REQUEST,
        data: id,
      });
      message.success('프로필 삭제 요청을 보냈습니다.');
      router.push('/'); // 또는 다른 프로필 목록 페이지
    }
  };

  const popoverContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Button type="text">친구하기</Button>
      <Button type="text" danger>친구끊기</Button>
    </div>
  );

  return (
    <div
      style={{
        width: 250,
        border: '1px solid #eee',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
        background: '#fff',
      }}
    >
      <div style={{ backgroundColor: '#f8dada', padding: '20px', position: 'relative' }}>
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            backgroundColor: '#ccc',
            overflow: 'hidden',
            marginBottom: 10,
          }}
        >
          {aniProfile && (
            <img
              src={`${imageBaseUrl}/${aniProfile}`}
              alt="프로필 사진"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <h3 style={{ margin: 0, fontWeight: 'bold' }}>{aniName}</h3>
        <p style={{ margin: '4px 0' }}>{aniAge}살</p>
        <p>
          {Followings?.length ?? '...'} 팔로잉 · {Followers?.length ?? '...'} 팔로워
        </p>
      </div>

      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small">수정</Button>
        <Button size="small" danger onClick={onClickDelete}>삭제</Button>
        <Popover content={popoverContent}>
          <EllipsisOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
        </Popover>
      </div>
    </div>
  );
};

export default AnimalProfileCard;
