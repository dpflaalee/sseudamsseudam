import React, { useCallback , useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Input, Menu, Dropdown, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import userInput from '@/hooks/userInput';

import { ADD_COMMENT_REQUEST } from '../../reducers/post';

const Wrapper = styled.div`
  padding: 5%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const ContentBox = styled.div`
  flex: 1;
`;

const TopText = styled.div`
  font-weight: 500;
`;

const Placeholder = styled.div`
  color: #999;
  margin-top: 4px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

const StyledButton = styled(Button)`
  background-color: #2f466c;
  color: white;
  border-radius: 12px;
  padding: 0 16px;
`;

const CommentForm = ({ post }) => { 
    ////////////////////////////////////////////////// code
    const { addCommentLoading, addCommentDone } = useSelector( state => state.post );
    const id = useSelector( state => state.user.user?.id);
    const dispatch = useDispatch();
    const [comment, onChangeComment, setText] = userInput('');

    useEffect(() => {
      if (addCommentDone) {setText('');}
    }, [addCommentDone]);
    const onSubmitForm = useCallback(() => {
      console.log( post.id, comment );
      if(!id) {return alert('로그인이 필요합니다.'); }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content:comment, userId:id, postId:post.id }
      })
    }, [comment, id]);

    ////////////////////////////////////////////////// view
    return(
      <Form layout="vertical" style={{ margin:50, position:'relative' }} onFinish={onSubmitForm} >
          <Input.TextArea rows={5} value={comment} onChange={onChangeComment}  />
          <Button type="primary" style={{position:'absolute', right:0, bottom:-50,}}     
                  htmlType='submit' loading={addCommentLoading}>댓글</Button>
      </Form>
      
    );
};
CommentForm.propTypes = {
  post: PropTypes.object.isRequired
};
export default CommentForm;
