import { all, put, delay, fork, takeLatest, call } from 'redux-saga/effects'  //#1
import axios from 'axios';  //##

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,

  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,

  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,

  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,

  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,

  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,

  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,

  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,

  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,

  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,

  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_SUCCESS,

  LOAD_BLOCK_REQUEST, LOAD_BLOCK_SUCCESS, LOAD_BLOCK_FAILURE,
  ADD_BLOCK_REQUEST, ADD_BLOCK_SUCCESS, ADD_BLOCK_FAILURE,
  REMOVE_BLOCK_REQUEST, REMOVE_BLOCK_SUCCESS, REMOVE_BLOCK_FAILURE,

} from '../reducers/user';

// 알림
import { ADD_NOTIFICATION_REQUEST } from '@/reducers/notification';
import NOTIFICATION_TYPE from '../../shared/constants/NOTIFICATION_TYPE';

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowersAPI(data) {
  console.log('loadFollowersAPI');
  console.log(data);
  return axios.get('/user/followers', data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowingsAPI(data) {
  return axios.get('/user/followings', data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error('🚨 LOAD_MY_INFO_FAILURE:', err);
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response?.data,
    });
  }
}


///// step3) 
function loginApi(data) {   //★   function* (X)
  return axios.post('/user/login', data); //##
}
function* login(action) {

  try {
    const result = yield call(loginApi, action.data); // 처리함수, 처리파라미터
    //yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,// action.data  //## 
    })
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    })
  }
}

//--
function logoutApi() {   //★   function* (X)
  return axios.post('/user/logout');
}
function* logout() {
  try {
    const result = yield call(logoutApi); //처리함수, 처리파라미터
    //yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data
    })
  }
}
function userDeleteApi() {   //★   function* (X)
  return axios.delete('/user/userDelete');
}
function* userDelete() {

  try {
    const result = yield call(userDeleteApi); //처리함수, 처리파라미터
    //yield delay(1000);
    yield put({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    yield put({
      type: USER_DELETE_FAILURE,
      data: error.response.data
    })
  }
}

//-- 
function signUpAPI(data) { //★   function* (X)   - 서버에 넘겨주는 값
  console.log('data=', data);
  return axios.post('/user', data);   //         /user 경로 , post, 회원가입정보(data)
}

function* signUp(action) {
  console.log('login=', action.data);
  try {
    const result = yield call(signUpAPI, action.data);  // 사용자가 화면에서 넘겨준값
    console.log('result=', result.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}
//-- 
function changeUserProfileAPI(data) { //★   function* (X)   - 서버에 넘겨주는 값
  console.log('data=', data);
  return axios.post('/user', data);   //         /user 경로 , post, 회원가입정보(data)
}

function* changeUserProfile(action) {
  console.log('login=', action.data);
  try {
    const result = yield call(signUpAPI, action.data);  // 사용자가 화면에서 넘겨준값
    console.log('result=', result.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}
function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  console.log('followData1111', typeof action.data);

  try {
    const result = yield call(followAPI, action.data);
    console.log('followData2222', result.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });

    // 알림
    yield put({
      type: ADD_NOTIFICATION_REQUEST,
      data: {
        notiType: NOTIFICATION_TYPE.FOLLOW,
        SenderId: action.notiData.SenderId,
        ReceiverId: action.notiData.ReceiverId,
      }
    });
    // E 알림
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// changeNickname 
//--
function changeNicknameApi(data) {   //★   function* (X)
  return axios.post('/user/nickname', { nickname: data });
}
function* changeNickname(action) {
  //const result = yield call( logoutApi); 처리함수, 처리파라미터
  try {
    yield delay(1000);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: action.data
    })
  } catch (error) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      data: error.response.data
    })
  }
}

// 차단 목록 불러오기
function loadBlocksApi(data) {
  return axios.get(`/user/block`);
}
function* loadBlocks(action) {
  const result = yield call(loadBlocksApi);
  try {
    yield delay(1000);
    yield put({
      type: LOAD_BLOCK_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_BLOCK_FAILURE,
      data: error.response.data
    })
  }
}

// 차단하기
function addBlocksApi(data) {
  return axios.patch(`/user/${data}/block`, data);
}
function* addBlocks(action) {
  const result = yield call(addBlocksApi, action.data);
  try {
    yield delay(1000);
    yield put({
      type: ADD_BLOCK_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: ADD_BLOCK_FAILURE,
      data: error.response.data
    })
  }
}
// 차단 풀기
function removeBlocksApi(data) {
  return axios.delete(`/user/${data}/block`);
}
function* removeBlocks(action) {
  const result = yield call(removeBlocksApi, action.data);
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_BLOCK_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: REMOVE_BLOCK_FAILURE,
      data: error.response.data
    })
  }
}
///// step2) ACTION 기능추가
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);  //LOG_IN 액션이 실행될때까지 기다리기
}
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);  //LOG_IN 액션이 실행될때까지 기다리기
}
function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);

}
function* watchUserDelete() {
  yield takeLatest(USER_DELETE_REQUEST, userDelete);

}
function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);  //요청 10 ->응답1
}
function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);  //요청 10 ->응답1
}
function* watchUserUploadImage() {
  yield takeLatest(USER_PROFILE_UPDATE_REQUEST, changeUserProfile);  //요청 10 ->응답1
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchLoadBlock() {
  yield takeLatest(LOAD_BLOCK_REQUEST, loadBlocks);
}
function* watchadddBlock() {
  yield takeLatest(ADD_BLOCK_REQUEST, addBlocks);
}
function* watchRemoveBlock() {
  yield takeLatest(REMOVE_BLOCK_REQUEST, removeBlocks);
}
///// step1) all()
export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchLoadMyInfo),
    fork(watchUserUploadImage),
    fork(watchUserDelete),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchChangeNickname),
    fork(watchRemoveFollower),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchLoadBlock),
    fork(watchadddBlock),
    fork(watchRemoveBlock),
  ]);
}
