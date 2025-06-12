import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_GROUPS_REQUEST, LOAD_GROUPS_SUCCESS, LOAD_GROUPS_FAILURE, // 그룹 로드
  CREATE_GROUP_REQUEST, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAILURE, // 그룹 생성
  UPDATE_GROUP_REQUEST, UPDATE_GROUP_SUCCESS, UPDATE_GROUP_FAILURE, // 그룹 수정
  DELETE_GROUP_REQUEST, DELETE_GROUP_SUCCESS, DELETE_GROUP_FAILURE, // 그룹 삭제
  LOAD_SINGLE_GROUP_REQUEST, LOAD_SINGLE_GROUP_SUCCESS, LOAD_SINGLE_GROUP_FAILURE,
  LOAD_MEMBERS_REQUEST, LOAD_MEMBERS_SUCCESS, LOAD_MEMBERS_FAILURE, // 멤버 로드
  KICK_MEMBER_REQUEST, KICK_MEMBER_SUCCESS, KICK_MEMBER_FAILURE, // 강퇴
  TRANSFER_OWNERSHIP_REQUEST, TRANSFER_OWNERSHIP_SUCCESS, TRANSFER_OWNERSHIP_FAILURE, // 권한양도
  JOIN_GROUP_REQUEST, JOIN_GROUP_SUCCESS, JOIN_GROUP_FAILURE, //즉시가입
  APPLY_GROUP_REQUEST, APPLY_GROUP_SUCCESS, APPLY_GROUP_FAILURE, // 가입신청
  LOAD_JOIN_REQUESTS_REQUEST, LOAD_JOIN_REQUESTS_SUCCESS, LOAD_JOIN_REQUESTS_FAILURE, // 신청현황
  APPROVE_JOIN_REQUEST, APPROVE_JOIN_SUCCESS, APPROVE_JOIN_FAILURE, // 가입승인
  REJECT_JOIN_REQUEST, REJECT_JOIN_SUCCESS, REJECT_JOIN_FAILURE, // 가입거절
} from '@/reducers/group';

// 알림
import { ADD_NOTIFICATION_REQUEST } from '@/reducers/notification';
import NOTIFICATION_TYPE from '../../shared/constants/NOTIFICATION_TYPE';

// 1. 그룹 로드
function loadGroupsAPI() { return axios.get('/groups'); }
function* loadGroups() {
  try {
    const result = yield call(loadGroupsAPI);
    yield put({ type: LOAD_GROUPS_SUCCESS, data: result.data });
  } catch (err) { yield put({ type: LOAD_GROUPS_FAILURE, error: err.response ? err.response.data : err.message }); }
}
function* watchLoadGroups() { yield takeLatest(LOAD_GROUPS_REQUEST, loadGroups); }

// 2. 그룹 생성
function createGroupAPI(data) {
  return axios.post('/groups', data, {
    withCredentials: true,
  });
}
function* createGroup(action) {
  try {
    const result = yield call(createGroupAPI, action.data);
    yield put({ type: CREATE_GROUP_SUCCESS, data: result?.data, });
  } catch (err) { yield put({ type: CREATE_GROUP_FAILURE, error: err.response.data }); }
}
function* watchCreateGroup() { yield takeLatest(CREATE_GROUP_REQUEST, createGroup); }

// 3-0 단일그룹 불러오기
function loadSingleGroupApi(groupId) { return axios.get(`/groups/${groupId}`); }
function* loadSingleGroup(action) {
  try {
    const result = yield call(loadSingleGroupApi, action.data);
    yield put({ type: LOAD_SINGLE_GROUP_SUCCESS, data: result.data });
  } catch (err) { yield put({ type: LOAD_SINGLE_GROUP_FAILURE, error: err.response ? err.response.data : err.message }); }
};
function* watchLoadSingleGroup() { yield takeLatest(LOAD_SINGLE_GROUP_REQUEST, loadSingleGroup); }

// 3. 그룹 수정
function updateGroupAPI(data) { return axios.patch(`/groups/${data.groupId}`, data); }
function* updateGroup(action) {
  try {
    const result = yield call(updateGroupAPI, action.data);
    yield put({ type: UPDATE_GROUP_SUCCESS, data: result.data });
  } catch (err) { yield put({ type: UPDATE_GROUP_FAILURE, error: err.response.data }); }
}
function* watchUpdateGroup() { yield takeLatest(UPDATE_GROUP_REQUEST, updateGroup); }

// 4. 그룹 삭제
function deleteGroupAPI(groupId) { return axios.delete(`/groups/${groupId}`); }
function* deleteGroup(action) {
  try {
    yield call(deleteGroupAPI, action.data);
    yield put({ type: DELETE_GROUP_SUCCESS, data: action.data });
  } catch (err) { yield put({ type: DELETE_GROUP_FAILURE, error: err.response.data }); }
}
function* watchDeleteGroup() { yield takeLatest(DELETE_GROUP_REQUEST, deleteGroup); }

//멤버관리--------------------------------------------------------------------
//1. 멤버 불러오기
function loadMembersAPI(groupId) { return axios.get(`/api/groups/${groupId}/members`); }
function* loadMembers(action) {
  try {
    console.log('멤버 로드 요청:', action);
    const result = yield call(loadMembersAPI, action.data);
    //console.log('API 응답 데이터:', result.data);
    yield put({ type: LOAD_MEMBERS_SUCCESS, data: result.data });
  } catch (err) { yield put({ type: LOAD_MEMBERS_FAILURE, error: err.response.data }); }
}
function* watchLoadMembers() { yield takeLatest(LOAD_MEMBERS_REQUEST, loadMembers); }

//2. 멤버 강퇴
function kickMemberAPI({ groupId, userId }) { return axios.delete(`/api/groups/${groupId}/members/${userId}`); }
function* kickMember(action) {
  try {
    yield call(kickMemberAPI, action.data);
    yield put({ type: KICK_MEMBER_SUCCESS, data: action.data.userId })
  } catch (err) { yield put({ type: KICK_MEMBER_FAILURE, error: err.response.data }); }
}
function* watchKickMember() { yield takeLatest(KICK_MEMBER_REQUEST, kickMember); }

//3. 권한위임
function transferOwnershipAPI({ groupId, userId }) { return axios.patch(`/api/groups/${groupId}/members/${userId}/transfer`); }
function* transferOwnership(action) {
  try {
    yield call(transferOwnershipAPI, action.data);
    yield put({ type: TRANSFER_OWNERSHIP_SUCCESS, data: action.data.userId })
  } catch (err) { yield put({ type: TRANSFER_OWNERSHIP_FAILURE, error: err.response.data }); }
}
function* watchTransferOwnership() { yield takeLatest(TRANSFER_OWNERSHIP_REQUEST, transferOwnership); }

//가입-----------------------------------------------------------------------------------
//1. 공개그룹 즉시가입
function joinGroupAPI(data) { console.log('joinGroupAPI 데이터----------------:', data); return axios.post(`/api/groups/${data.groupId}/join`); }
function* joinGroup(action) {
  try {
    yield call(joinGroupAPI, action.data);
    yield put({ type: JOIN_GROUP_SUCCESS });
    // 알림
    console.log('🍻 Group NOTIFICATION : SenderId : ', action.notiData.SenderId);
    console.log('🍻 Group NOTIFICATION : ReceiverId : ', action.notiData.ReceiverId);
    console.log('🍻 Group NOTIFICATION : targetId : ', action.notiData.targetId);
    yield put({
      type: ADD_NOTIFICATION_REQUEST,
      data: {
        notiType: NOTIFICATION_TYPE.GROUPAPPLY,
        SenderId: action.notiData.SenderId,
        ReceiverId: action.notiData.ReceiverId,
        targetId: action.notiData.targetId,
      }
    });
    // E 알림
  } catch (err) { yield put({ type: JOIN_GROUP_FAILURE, error: err.response.data || err.message }); }
}
function* watchJoinGroup() { yield takeLatest(JOIN_GROUP_REQUEST, joinGroup) }

//2. 비공개그룹 가입처리
function applyGroupAPI(data) { console.log('joinGroupAPI 데이터----------------:', data); return axios.post(`/api/groups/${data.groupId}/apply`); }
function* applyGroup(action) {
  try {
    yield call(applyGroupAPI, action.data);
    yield put({ type: APPLY_GROUP_SUCCESS, message: "가입 신청이 완료되었습니다!" });
    // 알림
    yield put({
      type: ADD_NOTIFICATION_REQUEST,
      data: {
        notiType: NOTIFICATION_TYPE.GROUPAPPLY,
        SenderId: action.notiData.SenderId,
        ReceiverId: action.notiData.ReceiverId,
        targetId: action.notiData.targetId,
      }
    });
    // E 알림
  } catch (err) { yield put({ type: APPLY_GROUP_FAILURE, error: err.response.data || err.message }) }
}
function* watchApplyGroup() { yield takeLatest(APPLY_GROUP_REQUEST, applyGroup) }
// --
// 3.가입 요청 불러오기
function loadJoinRequestsAPI(groupId) { return axios.get(`/api/groups/${groupId}/requests`); }
function* loadJoinRequests(action) {
  try {
    const result = yield call(loadJoinRequestsAPI, action.data);
    yield put({ type: LOAD_JOIN_REQUESTS_SUCCESS, data: result.data });
  } catch (err) { yield put({ type: LOAD_JOIN_REQUESTS_FAILURE, error: err.response.data }); }
}
function* watchLoadJoinRequests() { yield takeLatest(LOAD_JOIN_REQUESTS_REQUEST, loadJoinRequests); }

// 4. 승인
function approveJoinAPI(requestId, userId) {
  console.log("SAGA4. 승인한 요청 ID.................", requestId, userId);
  return axios.post(`/api/groups/${groupId}/requests/${requestId}/approve?userId=${userId}`);
}

function* approveJoin(action) {
  console.log("SAGA1. 승인 action데이터...............", action.data);
  try {
    const { groupId, userId } = action.data;
    const response = yield call(axios.get, `/api/groups/${groupId}/requests?userId=${userId}`);
    const request = response.data;
    console.log("SAGA2. 조회된 요청............", request);

    if (!request) {
      throw new Error('해당 요청을 찾을 수 없습니다.');
    }

    yield call(approveJoinAPI, request.id, userId);  // requestId와 userId를 전달
    yield put({ type: APPROVE_JOIN_SUCCESS, data: request.id });
  } catch (err) {
    const error = err.response ? err.response.data : err.message;
    yield put({ type: APPROVE_JOIN_FAILURE, error });
  }
}

function* watchApproveJoin() { yield takeLatest(APPROVE_JOIN_REQUEST, approveJoin); }

// 5. 거절
function rejectJoinAPI(requestId, userId) {
  console.log("SAGA4. 거절한 요청 ID.................", requestId, userId);
  return axios.post(`/api/groups/requests/${requestId}/reject?userId=${userId}`);  // 쿼리스트링 방식으로 전달
}

function* rejectJoin(action) {
  console.log("거절 action데이터...............", action.data);
  try {
    const { groupId, userId } = action.data;
    const response = yield call(axios.get, `/api/groups/${groupId}/requests?userId=${userId}`);
    const request = response.data;
    console.log("SAGA5. 거절 조회된 요청...............", request);

    if (!request) {
      throw new Error('해당 요청을 찾을 수 없습니다.');
    }

    yield call(rejectJoinAPI, request.id, userId);  // requestId와 userId를 전달
    yield put({ type: REJECT_JOIN_SUCCESS, data: request.id });
  } catch (err) {
    const error = err.response ? err.response.data : err.message;
    yield put({ type: REJECT_JOIN_FAILURE, error });
  }
}

function* watchRejectJoin() { yield takeLatest(REJECT_JOIN_REQUEST, rejectJoin); }


// root saga
export default function* groupSaga() {
  yield all([
    fork(watchLoadGroups),
    fork(watchCreateGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup),
    fork(watchLoadSingleGroup),
    fork(watchLoadMembers),
    fork(watchKickMember),
    fork(watchTransferOwnership),
    fork(watchJoinGroup),
    fork(watchApplyGroup),
    fork(watchLoadJoinRequests),
    fork(watchApproveJoin),
    fork(watchRejectJoin),
  ]);
}