import React, {useEffect, useState} from "react";
import AppLayout from "../../components/AppLayout";
import { Spin } from "antd";
import GroupList from '../../components/groups/GroupList';

const {Panel} = Collapse;

const GroupList = ()=>{
  ////////////////////////////////////////////code
  const dummyGroup=[{
    id:1
    ,title:'야옹아 멍멍해봐'
    ,members : 42
    ,content:'다묘다견 집사 모임 커뮤니티 내부에서 타인을 비방하거나 사칭하는 행위는 신고 및 강퇴의 원인이 될 수 있습니다.'
    // ,OpenScopeId
    ,category: ['강아지', '고양이']
  },{
    id:2
    ,title:'수상한고양'
    ,members : 54
    ,content:'어딘가 이상한 고양이 모임'
    // ,OpenScopeId
    ,category: ['고양이']    
  }]
  ////////////////////////////////////////////view
  return(<AppLayout>
    <div style={{padding:'24px'}}>
      <h1>그룹 리스트</h1>
    </div>
  </AppLayout>); //E.Return
};

export default GroupList;