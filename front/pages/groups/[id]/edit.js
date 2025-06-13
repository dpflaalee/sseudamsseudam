import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'; 
import AppLayout from '@/components/AppLayout';
import GroupForm from '@/components/groups/GroupForm';
import { LOAD_SINGLE_GROUP_REQUEST, UPDATE_GROUP_REQUEST } from '@/reducers/group'; 
import wrapper from '@/store/configureStore';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '@/reducers/user';
import axios from 'axios';

const EditGroupPage = () => {
  const router = useRouter(); const dispatch = useDispatch(); const {groupId} = router.query;
  const {singleGroup, updateGroupLoading, updateGroupDone} = useSelector((state) => state.group);
  const {group} = useSelector((state)=>state.group)

  useEffect(()=>{
    if(groupId){ dispatch({type: LOAD_SINGLE_GROUP_REQUEST, data: groupId}); }
  }, [groupId]);

  useEffect(()=>{
    if(updateGroupDone){router.push(`/groups/${groupId}`);} //  수정 후 그룹상세로 이동
  }, [updateGroupDone]);

  const handleSubmit = (formData) =>{
    dispatch({ type: UPDATE_GROUP_REQUEST, data: {groupId, ...formData} });
  };

  return(<AppLayout group={group}>
    {singleGroup?(
      <GroupForm
        initialValues={{
          title: singleGroup.title,
          content: singleGroup.content,
          categoryIds: singleGroup.Categories.map((c)=>c.id),
          openScopeId: singleGroup.OpenScope?.id
        }}
        onFinish={handleSubmit}
        isEditing={true}
        loading={updateGroupLoading}
      />
    ):(<p>그룹 정보를 불러오는 중입니다...</p>)}
  </AppLayout>)

};

///////////////////////////////////////////////////////////////////
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST,  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
///////////////////////////////////////////////////////////////////

export default EditGroupPage;
