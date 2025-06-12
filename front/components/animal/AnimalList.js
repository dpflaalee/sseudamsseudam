import React from 'react';
import { Button, Tabs, Avatar, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import AniProfile from '@/pages/animal/AniProfile';
import { PlusOutlined } from '@ant-design/icons';

const AnimalList = ({ animals }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const imageBaseUrl = 'http://localhost:3065/uploads/animalProfile';

  const handleClick = (id) => {
    router.push(`/animal/${id}`);
  };

  const handleRegisterAnimal = () => {
    router.push('/animal/ani-profile-form'); // 등록 페이지 경로에 맞게 수정
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 가로 스크롤 리스트 */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          padding: '16px 110px 16px 16px', // 버튼 공간 확보
          backgroundColor: 'rgba(254, 254, 220, 0.5)',
          borderRadius: 8,
        }}
      >
        {animals?.map((ani) => (
          <div
            key={ani.id}
            style={{ textAlign: 'center', cursor: 'pointer', marginRight: 20 }}
            onClick={() => handleClick(ani.id)}
          >
            <Avatar
              size={64}
              src={ani.aniProfile ? `${imageBaseUrl}/${ani.aniProfile}` : undefined}
              style={{ backgroundColor: '#ddd', marginBottom: 8 }}
            />
            <div style={{ fontSize: 14, color: '#333' }}>{ani.aniName}</div>
          </div>
        ))}
      </div>

      {/* 고정된 등록 버튼 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        
        <Button
          type="default"
          onClick={handleRegisterAnimal}
          
          style={{
            borderColor: '#1890ff',
            color: '#1890ff',
            fontWeight: 500,
            textAlign: 'right',
            height: 64,
            lineHeight: 1.2,
            whiteSpace: 'normal',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '8px 12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <PlusOutlined></PlusOutlined>
          <div style={{ fontSize: 13, lineHeight: '18px' }}>
            반려동물<br />프로필 등록
          </div>
        </Button>
      </div>
      
    </div>
    
  );
};
export default AnimalList;