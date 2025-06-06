import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loadAnimalProfile } from '@/reducers/animal';
import AppLayout from '@/components/AppLayout';
import AnimalProfileCard from '@/components/animal/AnimalProfileCard'; // 등록된 리스트
import AniFollow from '@/components/animal/AniFollow';
import AnimalList from '@/components/animal/AnimalList';

const AniProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(loadAnimalProfile(id)); 
    }
  }, [id]);

  return (
    <AppLayout>
      <AnimalProfileCard /> {/* Redux의 animals 배열 사용 */}
      <AnimalList/>
      <AniFollow/>
    </AppLayout>
  );
};

export default AniProfile;
