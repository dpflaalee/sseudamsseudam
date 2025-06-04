import React from "react";
import AppLayout from "@/components/AppLayout";
import GroupList from '@/components/groups/GroupList';
import {mockGroups} from '@/data/mockGroups';

const GroupListPage = ()=>{
  ////////////////////////////////////////////code

  ////////////////////////////////////////////view
  return(<AppLayout>
    <div style={{padding:'24px'}}>
      <div> {mockGroups && mockGroups.map((group)=>(
        <GroupList key={group.id} group={group} />
      ))} </div>
    </div>
  </AppLayout>); //E.Return
};

export default GroupListPage;