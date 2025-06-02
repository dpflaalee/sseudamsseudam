import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Avatar } from 'antd';
import Link from 'next/Link';
import PostCard from '../Post/PostCard';
import Profile from '../Profile';

const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: center;
  gap: 16px;
  font-weight: bold;
`;

const Tab = styled.div`
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? '2px solid black' : 'none')};
  margin: 5%;
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchResult = ({ results }) => {
  const [activeTab, setActiveTab] = useState('post');
  const currentList = results[activeTab] || [];
  console.log('🧞‍♀️ currentList ', currentList);

  return (
    <Container>
      <TabsContainer>
        <Tab active={activeTab === 'post'} onClick={() => setActiveTab('post')}><h3>게시글</h3></Tab>
        <Tab active={activeTab === 'group'} onClick={() => setActiveTab('group')}><h3>그룹</h3></Tab>
        <Tab active={activeTab === 'member'} onClick={() => setActiveTab('member')}><h3>멤버</h3></Tab>
      </TabsContainer>

      {currentList.length === 0 ? (
        <div>🔍 검색 결과가 없습니다.</div>
      ) : (
        currentList.map((item) => (
          <li key={item.id}>
            {activeTab === 'post' && (
              <PostCard post={item} /> // 🔥 바로 item 넘기면 됨
            )}
            {activeTab === 'group' && (
              <>
                <p>👥 그룹명: {item.title}</p>
                <p>소개: {item.content}</p>
              </>
            )}
            {activeTab === 'member' && (
              <Profile user={item} />
            )}
          </li>
        ))
      )}
    </Container>
  );
};

export default SearchResult;
