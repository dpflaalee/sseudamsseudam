<<<<<<< HEAD:front/components/ComplainForm.js
import React, { useCallback, useState, } from 'react';
import { Modal, Button as AntButton, Avatar, Input, Upload } from 'antd';
import { CloseOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { userInput } from '../hooks/userInput';
import { ADD_COMPLAIN_REQUEST } from '../reducers/complain'
import { useDispatch } from 'react-redux';
=======
import React, { useState, useCallback } from 'react';
import { Modal, Button as AntButton, Avatar, Input, Upload } from 'antd';
import { CloseOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { userInput } from '../../hooks/userInput';
import { useDispatch } from 'react-redux';
import { ADD_COMPLAIN_REQUEST } from '../../reducers/complain';
>>>>>>> origin/SH_0529:front/components/complains/ComplainForm.js

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

<<<<<<< HEAD:front/components/ComplainForm.js
const ComplainForm = ({ open, onClose, TARGET_TYPE }) => {
  //const [reason, setReason] = userInput('');
=======
const ComplainForm = ({ open, onClose, TARGET_TYPE, targetId }) => {
  const [content, setContent] = useState('');
>>>>>>> origin/SH_0529:front/components/complains/ComplainForm.js
  //const id = useSelector(state => state.user.user?.id);
  const id = 1;
  const dispatch = useDispatch();
  const onComplainSubmit = useCallback(() => {
    console.log('💥TARGET_TYPE ', TARGET_TYPE);
    console.log('💥Reason : ', content);
    console.log('💥Reporter : ', id);
<<<<<<< HEAD:front/components/ComplainForm.js
=======
    console.log('💥targetId : ', targetId);
>>>>>>> origin/SH_0529:front/components/complains/ComplainForm.js
    if (!content || !content.trim()) { return alert('게시글을 작성하세요.'); }
    dispatch({
      type: ADD_COMPLAIN_REQUEST,
      data: {
<<<<<<< HEAD:front/components/ComplainForm.js
        TARGET_TYPE: TARGET_TYPE,
        Reason: content,
        Reporter: id
      }
    })
  });
=======
        targetType: TARGET_TYPE,
        targetId: targetId,
        reason: content,
        reporter: id,
      }
    });
    console.log('🚀 Dispatched ADD_COMPLAIN_REQUEST');
    onClose();
    alert('신고가 완료되었습니다.');
  }, [content, dispatch, id, onClose, TARGET_TYPE]);

>>>>>>> origin/SH_0529:front/components/complains/ComplainForm.js
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

<<<<<<< HEAD:front/components/ComplainForm.js
      <ReasonInput rows={4} placeholder="신고 사유를 작성해주세요" name='content' />
=======
      <ReasonInput rows={4} placeholder="신고 사유를 작성해주세요" name='content' onChange={(e) => setContent(e.target.value)} />
>>>>>>> origin/SH_0529:front/components/complains/ComplainForm.js

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
