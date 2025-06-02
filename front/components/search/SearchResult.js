import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Avatar } from 'antd';

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

const SearchResult = () => {
    const [activeTab, setActiveTab] = useState('post');

    const renderContent = () => {
        switch (activeTab) {
            case 'post':
                return <div>게시글 결과입니다.</div>;
            case 'group':
                return <div>그룹 결과입니다.</div>;
            case 'member':
                return members.map((m) => (
                    <MemberCard key={m.id}>
                        <MemberInfo>
                            <Avatar>{m.name[0]}</Avatar>
                            <div>
                                <div>{m.name}</div>
                                <small>나를 팔로우합니다.</small>
                            </div>
                        </MemberInfo>
                        <Button danger={m.danger}>{m.status}</Button>
                    </MemberCard>
                ));
            default:
                return null;
        }
    };

    const members = [
        { id: 1, name: 'Vishnu Kumar Agrawal', status: '팔로우' },
        { id: 2, name: 'Sonu Gupta', status: '언팔로우', danger: true },
        { id: 3, name: 'Mohit Goyal', status: '언팔로우', danger: true },
    ];

    return (
        <Container>
            <TabsContainer>
                <Tab active={activeTab === 'post'} onClick={() => setActiveTab('post')}><h3>게시글</h3></Tab>
                <Tab active={activeTab === 'group'} onClick={() => setActiveTab('group')}><h3>그룹</h3></Tab>
                <Tab active={activeTab === 'member'} onClick={() => setActiveTab('member')}><h3>멤버</h3></Tab>
            </TabsContainer>

            {renderContent()}
        </Container>
    );
};

export default SearchResult;
