import React from 'react';
import AppLayout from '../../components/AppLayout';
import ChallengeList from '../../components/Calendar/Todolist/ChallengeList';

const userData = localStorage.getItem('user');

if (userData) {
  // 'user' 키에 값이 존재함
  console.log('user 정보가 localStorage에 저장되어 있습니다.');
} else {
  // 'user' 키에 값이 없음
  console.log('user 정보가 localStorage에 없습니다.');
}


const ChallengePage = () => {
  return (
    <AppLayout>
      <ChallengeList />
    </AppLayout>
  );
};

export default ChallengePage;
