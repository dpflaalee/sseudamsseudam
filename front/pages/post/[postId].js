// PostDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DetailCard from '@/components/detail/DetailCard';
import { useRouter } from 'next/router';

const PostDetailPage = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(async () => {
    if (!postId) return;
    try {
      const response = await axios.get(`http://localhost:3065/post/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error('게시물 로딩 오류:', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

  return <DetailCard post={post} onRefreshPost={fetchPost} />;
};

export default PostDetailPage;
