//그룹 타임라인 페이지
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import AppLayout from "@/components/AppLayout";
import PostForm from "@/components/post/PostForm";
import PostCard from "@/components/post/PostCard";
import GroupHeader from "@/components/groups/GroupHeader";
import GroupMember from "@/components/groups/GroupMember";
import GroupJoinRequests from "@/components/groups/GroupJoinRequests";

const GroupMain = () => {
  const router = useRouter();
  const {id:groupId}=router.query;
  const {mainPosts}=useSelector((state)=>state.post); //그룹별 게시물
  const [activeTab, setActiveTab] = useState("timeline");
  
  const isLeader = true; //방장 테스트용

  return (
    <AppLayout>
      <GroupHeader groupId={groupId}  activeTab={activeTab} setActiveTab={setActiveTab} isLeader={isLeader} />
      {activeTab === "timeline" && (<>
        <PostForm groupId={groupId} isGroup />
        {mainPosts
          .filter((post) => post.groupId === groupId) // 그룹용 게시물만
          .map((post) => (
            <PostCard key={post.id} post={post} isGroup />
          ))}
      </>)}
      {activeTab==="members"&&(<GroupMember groupId={groupId} isLeader={isLeader}/>)}
      {activeTab==="joinRequests" && isLeader &&(<GroupJoinRequests groupId={groupId}/> )}
    </AppLayout>
  );
};  

export default GroupMain;