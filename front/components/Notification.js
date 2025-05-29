import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { HeartFilled, RetweetOutlined, MessageOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
  &:hover {
    background: #f9f9f9;
  }
`;

const IconWrapper = styled.div`
  font-size: 20px;
  margin-right: 12px;
  color: ${props => props.color || '#666'};
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const Description = styled.div`
  color: #999;
  font-size: 14px;
`;

const Notification = ({ type, user, content }) => {
    const renderIcon = () => {
        switch (type) {
            case 'like':
                return <HeartFilled style={{ color: 'hotpink' }} />;
            case 'retweet':
                return <RetweetOutlined />;
            case 'comment':
                return <MessageOutlined />;
            default:
                return null;
        }
    };

    return (
        <Container>
            <IconWrapper>{renderIcon()}</IconWrapper>
            <Avatar src={``} style={{ marginRight: 12 }} />
            <Content>
                <Title>`username` 님이 `action`</Title>
                {<Description>디테일 블라블라</Description>}
            </Content>
        </Container>
    );
};

export default Notification;
