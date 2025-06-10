import React, {useState, useCallback, useEffect} from "react";
import PropTypes from "prop-types";    // 넘겨받은 데이터 확인
import { Button, Input } from "antd";  // 화면디자인
import { useSelector } from "react-redux";  // 중앙저장소
import Link from 'next/Link';

                           //게시글, 편집모드-false/true,수정, 삭제
const PostCardContent = ({ postData, editMode, onEditPost, onCancelUpdate }) => {
  ///////////////////////////////////// code
  const { updatePostLoading, updatePostDone } = useSelector(state => state.post); // 중앙저장소 상태
  const [ editText, setEditText ] = useState(postData); // 글받아서 수정
  const onChangeText = useCallback((e) => { setEditText(e.target.value); });  // 수정

  useEffect(() => { if(updatePostDone) { onCancelUpdate(); } },[updatePostDone])
  const onClickCancel = useCallback(() => { setEditText(postData); onCancelUpdate(); });  // 수정취소
  ///////////////////////////////////// view
  return (<div>
    { editMode ? (
      <>
        <Input.TextArea value={editText} onChange={onChangeText} />
        <Button.Group>
          <Button loading={updatePostLoading} onClick={onEditPost(editText)} >수정</Button>
          <Button type="primary" onClick={onClickCancel} >취소</Button>
        </Button.Group>
      </>
    ) : ( postData.split(/(#[^\s#]+)/g)  // 해쉬태그
                  .map((v, i) => {
                    if( v.match(/(#[^\s#]+)/) ) {
                       return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>{v}</Link>;
                    }
                    return v;
                  })
        )
    }
  </div>);
};
PostCardContent.propTypes = {
  postData : PropTypes.string.isRequired,
  editMode : PropTypes.bool,
  onEditPost: PropTypes.func.isRequired,
  onCancelUpdate: PropTypes.func.isRequired,
};
PostCardContent.defaultProps = {
  editMode:false,
};
export default PostCardContent;