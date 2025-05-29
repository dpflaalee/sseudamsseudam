import React, { useCallback, useState, } from 'react';
import { Modal, Button as AntButton, Avatar, Input, Upload } from 'antd';
import { CloseOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { userInput } from '../hooks/userInput';
import { ADD_COMPLAIN_REQUEST } from '../reducers/complain'
import { useDispatch } from 'react-redux';

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

const ComplainForm = ({ open, onClose, TARGET_TYPE }) => {
  //const [reason, setReason] = userInput('');
  //const id = useSelector(state => state.user.user?.id);
  const id = 1;
  const dispatch = useDispatch();
  const onComplainSubmit = useCallback(() => {
    console.log('💥TARGET_TYPE ', TARGET_TYPE);
    console.log('💥Reason : ', content);
    console.log('💥Reporter : ', id);
    if (!content || !content.trim()) { return alert('게시글을 작성하세요.'); }
    dispatch({
      type: ADD_COMPLAIN_REQUEST,
      data: {
        TARGET_TYPE: TARGET_TYPE,
        Reason: content,
        Reporter: id
      }
    })
  });
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
        <XButton type="" icon={<CloseOutlined />} onClick={onClose} />
      </Header>

      <UserInfo>
        <Avatar size={48} src="https://xsgames.co/randomusers/avatar.php?g=female" />
        <div>
          <div>{'유저 닉네임'}</div>
        </div>
      </UserInfo>

      <ReasonInput rows={4} placeholder="신고 사유를 작성해주세요" name='content' />

      <Footer>
        <BlackButton
          htmlType='submit'
          type="primary"
          onClick={onComplainSubmit}
        >
          신고하기
        </BlackButton>
      </Footer>
    </StyledModal>
  );
};

export default ComplainForm;
