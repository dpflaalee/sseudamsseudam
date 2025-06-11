import React, {useState, useCallback, useEffect} from "react";
import PropTypes from "prop-types";    // 넘겨받은 데이터 확인
import { Button, Input } from "antd";  // 화면디자인
import { useSelector } from "react-redux";  // 중앙저장소
import Link from 'next/Link';
import PostImages from "./PostImages";

                           //게시글, 편집모드-false/true,수정, 삭제
const PostCardContent = ({ postData, editMode, onEditPost, onCancelUpdate, images }) => {
  ///////////////////////////////////// code
  const { updatePostLoading, updatePostDone } = useSelector(state => state.post); // 중앙저장소 상태
  const [ editText, setEditText ] = useState(postData); // 글받아서 수정
  const [locationLink, setLocationLink] = useState(null);
  const onChangeText = useCallback((e) => { setEditText(e.target.value); });  // 수정

  useEffect(() => { if(updatePostDone) { onCancelUpdate(); } },[updatePostDone])
  const onClickCancel = useCallback(() => { setEditText(postData); onCancelUpdate(); });  // 수정취소

  useEffect(() => {
    const locationMatch = editText.match(/\[location\]\((.*?)\)/);
    if (locationMatch) {
      setLocationLink(locationMatch[1]);
    }
  }, [editText]);

  const textWithoutLocation = editText.replace(/\[location\]\((.*?)\)/, '');

  // 카카오맵으로 이동
  const goToKakaoMap = () => {
    if (locationLink) {
      window.open(locationLink, "_blank");
    }
  };

  ///////////////////////////////////// view
  return (
    <div>
      {editMode ? (
        <>
          <Input.TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button loading={updatePostLoading} onClick={onEditPost(editText)} >수정</Button>
            <Button type="primary" onClick={onClickCancel} >취소</Button>
          </Button.Group>
        </>
      ) : (
        <>
          <div>
            {textWithoutLocation.split(/(#[^\s#]+)/g)
              .map((v, i) => {
                if (v.match(/(#[^\s#]+)/)) {
                  return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>{v}</Link>;
                }
                return v;
              })
            }
          </div>
          {/* 위치 공유 버튼 (위치 링크가 있을 경우에만 표시) */}
          {locationLink && (
            <div style={{ marginTop: 10 }}>
              <Button 
                type="primary" 
                onClick={goToKakaoMap} 
                style={{ backgroundColor: '#3b5998', color: 'white' }}
              >
                카카오맵에서 보기
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
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