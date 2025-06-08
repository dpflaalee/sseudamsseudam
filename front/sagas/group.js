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
  APPLY_GROUP_REQUEST, APPLY_GROUP_SUCCESS, APPLY_GROUP_FAILURE, // 가입신청
  LOAD_JOIN_REQUESTS_REQUEST, LOAD_JOIN_REQUESTS_SUCCESS, LOAD_JOIN_REQUESTS_FAILURE, // 신청현황
  APPROVE_JOIN_REQUEST, APPROVE_JOIN_REQUEST_SUCCESS, APPROVE_JOIN_REQUEST_FAILURE, // 가입승인
  REJECT_JOIN_REQUEST, REJECT_JOIN_REQUEST_SUCCESS, REJECT_JOIN_REQUEST_FAILURE, // 가입거절
} from '@/reducers/group';

// 1. 그룹 로드
function loadGroupsAPI() { return axios.get('/groups'); }
function* loadGroups() {
  try {
    const result = yield call(loadGroupsAPI);
    yield put({ type: LOAD_GROUPS_SUCCESS, data: result.data });
  } catch (err) { yield put({ type: LOAD_GROUPS_FAILURE, error: err.response.data });}
}
function* watchLoadGroups() { yield takeLatest(LOAD_GROUPS_REQUEST, loadGroups);}

// 2. 그룹 생성
function createGroupAPI(data) { return axios.post('/groups', data);}
function* createGroup(action) {
  try {
    const result = yield call(createGroupAPI, action.data);
    yield put({ type: CREATE_GROUP_SUCCESS, data: result.data });
  } catch (err) { yield put({ type: CREATE_GROUP_FAILURE, error: err.response.data }); }
}
function* watchCreateGroup() {yield takeLatest(CREATE_GROUP_REQUEST, createGroup);}

// 3-0 단일그룹 불러오기
function loadSingleGroupApi(groupId){return axios.get(`/groups/${groupId}`); }
function* loadSingleGroup(action){
  try{
    const result = yield call(loadSingleGroupApi, action.data);
    yield put({ type: LOAD_SINGLE_GROUP_SUCCESS, data: result.data });
  } catch(err){ yield put({ type: LOAD_SINGLE_GROUP_FAILURE, error: err.response ? err.response.data : err.message }); }
};
function* watchLoadSingleGroup(){ yield takeLatest(LOAD_SINGLE_GROUP_REQUEST, loadSingleGroup); }

// 3. 그룹 수정
function updateGroupAPI(data) { return axios.patch(`/groups/${data.groupId}`, data);}
function* updateGroup(action) {
  try {
    const result = yield call(updateGroupAPI, action.data);
    yield put({ type: UPDATE_GROUP_SUCCESS, data: result.data });
  } catch (err) {yield put({ type: UPDATE_GROUP_FAILURE, error: err.response.data });}
}
function* watchUpdateGroup() {yield takeLatest(UPDATE_GROUP_REQUEST, updateGroup);}

// 4. 그룹 삭제
function deleteGroupAPI(groupId) {return axios.delete(`/groups/${groupId}`);}
function* deleteGroup(action) {
  try {
    yield call(deleteGroupAPI, action.data);
    yield put({ type: DELETE_GROUP_SUCCESS, data: action.data });
  } catch (err) {yield put({ type: DELETE_GROUP_FAILURE, error: err.response.data });}
}
function* watchDeleteGroup() {yield takeLatest(DELETE_GROUP_REQUEST, deleteGroup);}

// root saga
export default function* groupSaga() {
  yield all([
    fork(watchLoadGroups),
    fork(watchCreateGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup),
    fork(watchLoadSingleGroup),
  ]);
}