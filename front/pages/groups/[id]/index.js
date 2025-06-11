import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import AppLayout from "@/components/AppLayout";
import PostForm from "@/components/post/PostForm";
import PostCard from "@/components/post/PostCard";
import GroupHeader from "@/components/groups/GroupHeader";
import GroupMember from "@/components/groups/GroupMember";
import GroupJoinRequests from "@/components/groups/GroupJoinRequests";
import { LOAD_MEMBERS_REQUEST } from "@/reducers/group";

const GroupMain = () => {
  const router = useRouter();
  const { id: groupId } = router.query;
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("timeline");

  const { group, members } = useSelector((state) => state.group);
  const currentUserId = useSelector((state) => state.user.user?.id);

  // 방장 여부 판별
  const isLeader = members?.some(
    (member) => member.id === currentUserId && member.isLeader
  );

  useEffect(() => {
    if (groupId) {
      dispatch({
        type: LOAD_MEMBERS_REQUEST,
        data: groupId,
      });
    }
  }, [groupId]);

  return (
    <AppLayout group={group}>
      <GroupHeader
        groupId={groupId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLeader={isLeader}
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
        <GroupJoinRequests groupId={groupId} />
      )}
    </AppLayout>
  );
};

export default GroupMain;