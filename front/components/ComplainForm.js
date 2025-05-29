import React, { useState } from 'react';
import { Modal, Button as AntButton, Avatar, Input, Upload } from 'antd';
import { CloseOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { userInput } from '../hooks/userInput';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    padding: 24px;
  }
  .ant-modal-header {
    border-bottom: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
  gap: 10px;
`;

const ReasonInput = styled(Input.TextArea)`
  margin: 16px 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const BlackButton = styled(AntButton)`
   background-color: black;
   color: white;
   border: none;
   &:hover {
     background-color: #222;
     color: white;
   }
 `
const XButton = styled(AntButton)`
 
 `

const ComplainForm = ({ open, onClose }) => {
  //const [reason, setReason] = userInput('');

  return (
    <StyledModal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
    >
      <Header>
        <h3>신고하기</h3>
        <XButton type="text" icon={<CloseOutlined />} onClick={onClose} />
      </Header>

      <UserInfo>
        <Avatar size={48} src="https://xsgames.co/randomusers/avatar.php?g=female" />
        <div>
          <div>{'유저 닉네임'}</div>
        </div>
      </UserInfo>

      <ReasonInput rows={4} placeholder="신고 사유를 작성해주세요" />

      <Footer>
        <BlackButton
          htmlType='submit'
          type="primary"
        >
          신고하기
        </BlackButton>
      </Footer>
    </StyledModal>
  );
};

export default ComplainForm;
