import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import AppLayout from "@/components/AppLayout";
import PostForm from "@/components/post/PostForm";
import PostCard from "@/components/post/PostCard";
import GroupHeader from "@/components/groups/GroupHeader";
import GroupMember from "@/components/groups/GroupMember";
import GroupJoinRequests from "@/components/groups/GroupJoinRequests";
import wrapper from "@/store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import { LOAD_GROUPS_REQUEST, LOAD_JOIN_REQUESTS_REQUEST, LOAD_MEMBERS_REQUEST } from "@/reducers/group";
import { LOAD_MY_INFO_REQUEST } from "@/reducers/user";
import { LOAD_POSTS_REQUEST } from "@/reducers/post";

const GroupMain = () => {
  const router = useRouter();
  const { id: groupId } = router.query;
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("timeline");

  const { group, members } = useSelector((state) => state.group);
  const currentUserId = useSelector((state) => state.user.user?.id);

  // 방장 여부 판별
  const isLeader = members?.some((member) => member.id === currentUserId && member.isLeader );

  //승인/거절용 가입 멤버 불러오기
  useEffect(()=>{
    if(groupId){dispatch({type: LOAD_MEMBERS_REQUEST, data:groupId});}
    if(isLeader){dispatch({type:LOAD_JOIN_REQUESTS_REQUEST, data: groupId});}
  },[groupId, dispatch, isLeader])
  console.log('groupId.................', groupId)

  const allGroups = useSelector((state)=>state.group.groups);
  console.log('allGroups............', allGroups)
  const groupDetail = allGroups.find((group)=>group.id ===parseInt(groupId, 10));
  console.log('그룹디테일.............', groupDetail);

  return (
    <AppLayout group={group}>
      <GroupHeader
        groupId={groupId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLeader={isLeader}
        title={groupDetail?.title}
      />
      {activeTab === "timeline" && (
        <>
          <PostForm groupId={groupId} isGroup />
          {group?.Posts?.map((post) => (
            <PostCard key={post.id} post={post} isGroup />
          ))}
        </>
      )}
      {activeTab === "members" && (
        <GroupMember groupId={groupId} isLeader={isLeader} />
      )}
      {activeTab === "joinRequests" && isLeader && (
        <GroupJoinRequests groupId={groupId}    />
      )}
    </AppLayout>
  );
};

////////////////////////////////////////
export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
  //1. cookie설정
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if(context.req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  //2. redux 액션
  context.store.dispatch({type:LOAD_MY_INFO_REQUEST});
  context.store.dispatch({type: LOAD_POSTS_REQUEST});
  context.store.dispatch({type: LOAD_MEMBERS_REQUEST});
  context.store.dispatch({type: LOAD_JOIN_REQUESTS_REQUEST});
  context.store.dispatch({type: LOAD_GROUPS_REQUEST});
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
});
////////////////////////////////////////

export default GroupMain;