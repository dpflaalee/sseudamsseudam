//그룹 타임라인 페이지
import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AppLayout from "@/components/AppLayout";
import PostForm from "@/components/post/PostForm";
import PostCard from "@/components/post/PostCard";
import GroupHeader from "@/components/groups/GroupHeader";

const GroupMain = () => {
  const router = useRouter();
  const {id:groupId}=router.query;
  const {mainPosts}=useSelector((state)=>state.post); //그룹별 게시물

  return (
    <AppLayout>
      <GroupHeader groupId={groupId} />
      <PostForm groupId={groupId} isGroup />
      {mainPosts
        .filter((post) => post.groupId === groupId) // 그룹용 게시물만
        .map((post) => (
          <PostCard key={post.id} post={post} isGroup />
        ))}
    </AppLayout>
  );
};  

export default GroupMain;