import React from 'react';
import { Button, Tabs, Avatar, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import AniProfile from '@/pages/animal/AniProfile';

const AnimalList = () => {
  const router = useRouter();
  const { animals } = useSelector((state) => state.animal);
  const imageBaseUrl = 'http://localhost:3065/uploads/animalProfile'; 

  const handleClick = (id) => {
    router.push(`/animal/${id}`);
  };

  return (
    <div style={{ display: 'flex', gap: 20, marginBottom: 10, backgroundColor: '#fefedc' }}>
      {animals.map((ani) => (
        <div
          key={ani.id}
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleClick(ani.id)}
        >
          <Avatar
            size={64}
            src={ani.aniProfile ? `${imageBaseUrl}/${ani.aniProfile}` : undefined}
            style={{ backgroundColor: '#ddd' ,  margin: 10}}
          />
          <div style={{ marginTop: 8 }}>{ani.aniName}</div>
        </div>
      ))}
    </div>
  );
};
export default AnimalList;