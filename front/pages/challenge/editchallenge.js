import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import AppLayout from '../../components/AppLayout';
import ChallengeChange from '../../components/Calendar/Todolist/ChallengeChange';

const EditChallengePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [challenge, setChallenge] = useState(null);

  // 관리자 권한 체크
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.isAdmin !== 1) {
      alert('권한이 없습니다.');
      router.replace('/challenge');  // 권한 없으면 메인으로 리다이렉트
    }
  }, [router]);

  // 챌린지 데이터 불러오기
  useEffect(() => {
    if (!id) return;
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`http://localhost:3065/calendar/${id}`);
        setChallenge(res.data);
      } catch (error) {
        alert('챌린지 정보를 불러오는데 실패했습니다.');
      }
    };
    fetchChallenge();
  }, [id]);

  // 수정 제출 핸들러
  const handleSubmit = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3065/calendar/${id}`, updatedData);
      message.success('챌린지가 성공적으로 수정되었습니다.');
      router.push('/challenge');
    } catch (error) {
      message.error('챌린지 수정에 실패했습니다.');
    }
  };

  return (
    <AppLayout>
      <ChallengeChange challenge={challenge} onSubmit={handleSubmit} />
    </AppLayout>
  );
};

export default EditChallengePage;
