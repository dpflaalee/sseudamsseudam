import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "@/components/AppLayout";
import GroupList from '@/components/groups/GroupList';
import { LOAD_GROUPS_REQUEST } from "@/reducers/group";
import { Spin } from "antd";

const GroupListPage = ()=>{
  ////////////////////////////////////////////code
  const dispatch = useDispatch();
  const { groups, loadGroupsLoading } = useSelector((state)=>state.group);

  useEffect(()=>{dispatch({type: LOAD_GROUPS_REQUEST}); }, [] );
  ////////////////////////////////////////////view
  return(<AppLayout>
    <div style={{padding:'24px'}}>
      {loadGroupsLoading? (<Spin size="large"/>) : (
        groups &&  groups.map((group) => <GroupList key={group.id} group={group} /> ) 
      ) }
    </div>
  </AppLayout>); //E.Return
};

export default GroupListPage;