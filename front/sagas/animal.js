import {all, put, takeLatest, call, fork} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_ANIPROFILE_REQUEST,
  ADD_ANIPROFILE_SUCCESS,
  ADD_ANIPROFILE_FAILURE,
  LOAD_ANIMAL_PROFILE_REQUEST,
  LOAD_ANIMAL_PROFILE_SUCCESS,
  LOAD_ANIMAL_PROFILE_FAILURE,
  LOAD_ANIMAL_LIST_REQUEST,
  LOAD_ANIMAL_LIST_SUCCESS,
  LOAD_ANIMAL_LIST_FAILURE,
  ANIFOLLOW_REQUEST,
  ANIFOLLOW_SUCCESS,
  ANIFOLLOW_FAILURE,
  ANIUNFOLLOW_REQUEST,
  ANIUNFOLLOW_SUCCESS,
  ANIUNFOLLOW_FAILURE,
  REMOVE_ANIFOLLOW_REQUEST,
  REMOVE_ANIFOLLOW_SUCCESS,
  REMOVE_ANIFOLLOW_FAILURE,
} from '../reducers/animal';

// function addAniProfileAPI(data) {
//   return axios.post('/animal/animalform', data); //백엔드 연동시 필요
// }

function addAniProfileAPI(formData) {
  return axios.post('/animal/animalform', formData);
  // return axios.post('/animal/animalform', data, {
  //   withCredentials: true,
  // });

}
function * addAniProfile(action) {
  try {
    const result = yield call(addAniProfileAPI, action.data);
    yield put({
      type: ADD_ANIPROFILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error('Saga Error:', err.response?.data || err);
    yield put({
      type: ADD_ANIPROFILE_FAILURE,
      error: err.response.data || err.message,
    });
  }
}

function loadAnimalProfileAPI(id) {
  return axios.get(`/animal/${id}`);
}
function* loadAnimalProfile(action) {
  try {
    const result = yield call(loadAnimalProfileAPI, action.data);
    yield put({ type: LOAD_ANIMAL_PROFILE_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_ANIMAL_PROFILE_FAILURE, error: err.response?.data || err.message });
  }
}
function loadAnimalListAPI() {
  return axios.get('/animal/list');
}
function* loadAnimalList() {
  try {
    const result = yield call(loadAnimalListAPI);
    yield put({ type: LOAD_ANIMAL_LIST_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_ANIMAL_LIST_FAILURE, error: err.response?.data || err.message });
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
function* watchLoadAnimalProfile() {
  yield takeLatest(LOAD_ANIMAL_PROFILE_REQUEST, loadAnimalProfile);
}
function* watchLoadAnimalList() {
  yield takeLatest(LOAD_ANIMAL_LIST_REQUEST, loadAnimalList);
}


export default function* animalSaga() {
  yield all([
    fork(watchAddAniProfile),
    fork(watchLoadAnimalProfile),
    fork(watchLoadAnimalList),
    takeLatest(ANIUNFOLLOW_REQUEST, aniUnfollow),
    takeLatest(REMOVE_ANIFOLLOW_REQUEST, removeAniFollow),
  ]);
}
