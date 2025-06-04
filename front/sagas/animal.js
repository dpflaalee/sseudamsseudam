import {all, put, takeLatest, call, fork} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_ANIPROFILE_REQUEST,
  ADD_ANIPROFILE_SUCCESS,
  ADD_ANIPROFILE_FAILURE,
  LOAD_ANIPROFILE_REQUEST,
  LOAD_ANIPROFILE_SUCCESS,
  LOAD_ANIPROFILE_FAILURE,
  ANIFOLLOW_REQUEST,
  ANIFOLLOW_SUCCESS,
  ANIFOLLOW_FAILURE,
  ANIUNFOLLOW_REQUEST,
  ANIUNFOLLOW_SUCCESS,
  ANIUNFOLLOW_FAILURE,
  LOAD_ANIFOLLOWERS_REQUEST,
  LOAD_ANIFOLLOWERS_SUCCESS,
  LOAD_ANIFOLLOWERS_FAILURE,
  REMOVE_ANIFOLLOW_REQUEST,
  REMOVE_ANIFOLLOW_SUCCESS,
  REMOVE_ANIFOLLOW_FAILURE,
} from '../reducers/animal';

// function addAniProfileAPI(data) {
//   return axios.post('/animal/animalform', data); //백엔드 연동시 필요
// }

function addAniProfileAPI(data) {
  return axios.post('/animal/animalform', data, {
    withCredentials: true,
  });
}
function * addAniProfile(action) {
  try {
    const result = yield call(addAniProfileAPI, action.data);
    yield put({
      type: ADD_ANIPROFILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ANIPROFILE_FAILURE,
      error: err.response.data,
    });
  }
}

function* aniUnfollow(action) {
  try {
    // yield call(api, action.data); // 서버 요청
    yield put({
      type: ANIUNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ANIUNFOLLOW_FAILURE,
      error: err.message,
    });
  }
}


function removeAnifollowerAPI(id) {
  return axios.delete(`/api/animal/${id}`); 
}
function* removeAniFollow(action) {
  try {
    // const result = yield call(removeAniProfileAPI, action.data); // 실제 API
    yield put({
      type: REMOVE_ANIFOLLOW_SUCCESS,
      data: action.data, // result.data.id 또는 action.data (가짜용)
    });
  } catch (err) {
    yield put({
      type: REMOVE_ANIFOLLOW_FAILURE,
      error: err.response?.data || err.message,
    });
  }
}

function* watchAddAniProfile() {
  yield takeLatest(ADD_ANIPROFILE_REQUEST, addAniProfile);
}

export default function* animalSaga() {
  yield all([
    fork(watchAddAniProfile),
    takeLatest(ADD_ANIPROFILE_REQUEST, addAniProfile),
    takeLatest(ANIUNFOLLOW_REQUEST, aniUnfollow),
    takeLatest(REMOVE_ANIFOLLOW_REQUEST, removeAniFollow),
  ]);
}
