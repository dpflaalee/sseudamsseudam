import React, { useState } from 'react';
import { Card, Avatar } from 'antd';
import { HeartTwoTone, RetweetOutlined, MessageOutlined, EllipsisOutlined, CloseOutlined } from '@ant-design/icons';
import PostImages from '../../components/Post/PostImages';  // 이미지 컴포넌트
import CommentForm from '../../components/Comment/CommentForm';
import { useRouter } from 'next/router';

const DetailCard = ({ post }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = () => { router.push('/'); };

  return (
    <div style={{ margin: '3%' }}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          <HeartTwoTone twoToneColor="#f00" key="heart" />,
          <MessageOutlined key="comment" />,
          <EllipsisOutlined />
        ]}
        extra={
          <CloseOutlined
            style={{ fontSize: 20, color: 'gray', cursor: 'pointer' }} // X 아이콘 스타일
            onClick={handleClose} // 클릭 시 홈으로 이동
          />
        }        
      >
        <Card.Meta
          avatar={<Avatar />}
          title="Post Title"  // 포스트 제목 혹은 작성자 이름
          description="2025-05-30 14:30"  // 작성 시간
          style={{ marginBottom: 16 }}
        />
        <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
          This is a post content. Display post content here.  // 테스트용 내용
        </div>
        <PostImages images={[]} /> {/* 테스트용 빈 이미지 */}
      </Card>
      <Card>
      <CommentForm/>
      </Card>
    </div>
  );
};

// 테스트용 post 데이터
const testPost = {
  id: 1,
  content: "This is a test post content for the detail view.",
  User: {
    nickname: "User123"
  },
  meta: {
    createdAt: "2025-05-30T14:30:00Z"
  },
  Images: []
};

const DetailPage = () => {
  return <DetailCard post={testPost} />;
};

export default DetailPage;