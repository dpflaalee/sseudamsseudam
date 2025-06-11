import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popover, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { REMOVE_ANIPROFILE_REQUEST } from '@/reducers/animal';

const AnimalProfileCard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedAnimal } = useSelector((state) => state.animal);
  const imageBaseUrl = 'http://localhost:3065/uploads/animalProfile';

  if (!selectedAnimal) return null;

  const { id, aniName, aniAge, aniProfile, Followings, Followers, CategoryId} = selectedAnimal;

  const onClickModify = () => {
    router.push(`/animal/${id}/edit`);
  };
  
  const { category } = selectedAnimal;

  const onClickDelete = () => {
    if (window.confirm(`${aniName} 프로필을 정말 삭제하시겠습니까?`)) {
      dispatch({
        type: REMOVE_ANIPROFILE_REQUEST,
        data: id,
      });
      message.success('프로필 삭제 요청을 보냈습니다.');
      router.push('/');
    }
  };

  const popoverContent = (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 6 }}>
      <Button type="text" style={{ textAlign: 'left', padding: '4px 8px' }}>
        친구찾기
      </Button>
    </div>
  );

  return (
    <div style={{width: '100%', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' }}>
      <div
        style={{
          backgroundColor: '#f8dada',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: '#ccc',
            overflow: 'hidden',
            marginRight: 16,
            transform: 'translateY(0)',
            flexShrink: 0,
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
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>{aniName}</div>
          {category?.content && (
            <div style={{ fontSize: 13, marginTop: 4, color: '#666' }}>
              {category.content}
            </div>
          )}
          <div style={{ fontSize: 14, marginTop: 4 }}>
            {aniAge}살&nbsp;&nbsp;&nbsp;
            {Followings?.length ?? 0}팔로잉&nbsp;&nbsp;&nbsp;
            {Followers?.length ?? 0}팔로워
          </div>
        </div>
        
      </div>

      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button size="small" onClick={onClickModify}>
          정보 수정
        </Button>
        <Button size="small" danger onClick={onClickDelete}>
          프로필 삭제
        </Button>
        <Popover content={popoverContent} trigger="click">
          <EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer', justifyContent: 'flex-end' }} />
        </Popover>
      </div>
    </div>
  );
};

export default AnimalProfileCard;
