import React from "react";
import AppLayout from "../../components/AppLayout";

const GroupListPage = ()=>{
  ////////////////////////////////////////////code
  const dummyGroup=[{
    id:1
    ,title:''
    ,content:''
    // ,OpenScopeId
    ,category: '강아지' //이후 테이블로 변환
  },{}]
  ////////////////////////////////////////////view
  return(<AppLayout>
    <div>그룹리스트</div>
  </AppLayout>); //E.Return
};

export default GroupListPage;