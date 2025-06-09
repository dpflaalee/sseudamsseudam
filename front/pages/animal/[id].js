import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  // const {animals, selectedAnimal} = useSelector((state) => state.animal);
  const { userAnimals, selectedAnimal } = useSelector((state) => state.animal);

  useEffect(() => {
    if (id) {
      dispatch(loadAnimalProfile(id)); 
    }
  }, [id]);

  return (
    <AppLayout>
      <AnimalProfileCard />
      <AnimalList animals={userAnimals}/>
      <AniFollow/>
    </AppLayout>
  );
};

export default AniProfile;
