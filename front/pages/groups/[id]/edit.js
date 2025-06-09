import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'; 
import AppLayout from '@/components/AppLayout';
import GroupForm from '@/components/groups/GroupForm';
import { LOAD_SINGLE_GROUP_REQUEST, UPDATE_GROUP_REQUEST } from '@/reducers/group'; 

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


  //const { id } = router.query || {id:'42'}; //테스트용. 추후 삭제

/*  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null);

  // 그룹 정보 불러오기
  useEffect(() => {
    if (!id) return;

    //실제 API 요청으로 대체해야 함
    const fetchGroupData = async () => {
      setLoading(true);
      try {
        const response = {
          title: '고양이 집사 모임',
          categories: ['고양이'],
          description: '고양이 사랑하는 사람들끼리 모입시다.',
          isPrivate: true,
        };
        setInitialValues(response);
      } catch (error) {
        message.error('그룹 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [id]);

  // 수정완료
  const handleEdit = (values) => {
    console.log('그룹 수정 값:', values);
    message.success('그룹이 수정되었습니다!');
    router.push('/groups');
  };

  return (
    <AppLayout>
      <Card style={{ border: 'none' }}>
        <Title level={3}>그룹 수정</Title>
        {loading ? (
          <Spin />
        ) : (
          <GroupForm mode="edit" initialValues={initialValues} onFinish={handleEdit} />
        )}
      </Card>
    </AppLayout>
  );*/
};

export default EditGroupPage;
