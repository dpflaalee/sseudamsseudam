import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailCard from '@/components/detail/DetailCard';
import { useRouter } from 'next/router';

const PostDetailPage = () => {
  const router = useRouter();
  const { postId } = router.query;  // URL에서 postId를 받아옵니다.
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!postId) return;  // postId가 없으면 API를 호출하지 않음
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3065/post/${postId}`);
        setPost(response.data);  // 데이터를 state에 저장
      } catch (error) {
        console.error('게시물 로딩 오류:', error);
        setPost(null);  // 오류 발생 시 null로 설정
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return <DetailCard post={post} />;
};

export default PostDetailPage;
