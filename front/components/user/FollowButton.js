import React,{useCallback} from "react"; //부품객체
import {Button} from 'antd'; // 디자인
import PropTypes from "prop-types"; //넘겨받은 파라미터 테스트
import { useSelector, useDispatch } from "react-redux"; //중앙저장소 부품
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from "@/reducers/user"; //액션타입


const FollowButton = ({ postUser, setPostUser, currentUserId }) => {
  /////////////////////////////////////code
  console.log('followUser',postUser)
  const dispatch = useDispatch();
  const {user, followLoading, unFollowLoading} = useSelector(state => state.user);
  //팔로잉하는 사람들 목록중에 아이디가 있니? - 팔로잉여부
  const isFollowing = user?.Followings.some((v) => v.id == postUser.id);
  const onClickFollow = useCallback(() =>  {
    if (isFollowing){ // 팔로잉 - 내친구 - 언팔로우
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: postUser.id
      })
       // 상태 업데이트
        setPostUser((prev) => ({
          ...prev,
          Followers: prev.Followers.filter((f) => f.id !== currentUserId),
        }));
    } else{ // 팔로우
      console.log('팔로우',postUser)
      console.log('팔로우',currentUserId)
      dispatch({
        type: FOLLOW_REQUEST,
        data: postUser.id
      })
       // 상태 업데이트
        setPostUser((prev) => ({
          ...prev,
          Followers: [...prev.Followers, {id:currentUserId}],
        }));
    }
  }, [isFollowing,postUser]);
  /////////////////////////////////////view
  return (
    <Button loading={followLoading||unFollowLoading} onClick={onClickFollow}>
      {isFollowing? '언팔로우':'팔로우'}
    </Button>
  );
}
FollowButton.propTypes  ={
  //post : PropTypes.string
  postUser: PropTypes.object.isRequired,
}
export default FollowButton;