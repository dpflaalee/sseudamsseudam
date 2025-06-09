import { all, put, takeLatest, call, fork } from 'redux-saga/effects';
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
  REMOVE_ANIFOLLOW_REQUEST,
  REMOVE_ANIFOLLOW_SUCCESS,
  REMOVE_ANIFOLLOW_FAILURE,
  LOAD_ANIFOLLOWERS_REQUEST,
  LOAD_ANIFOLLOWERS_SUCCESS,
  LOAD_ANIFOLLOWERS_FAILURE,
  LOAD_ANIFOLLOWINGS_REQUEST,
  LOAD_ANIFOLLOWINGS_SUCCESS,
  LOAD_ANIFOLLOWINGS_FAILURE,
  REMOVE_ANIPROFILE_REQUEST,
  REMOVE_ANIPROFILE_SUCCESS,
  REMOVE_ANIPROFILE_FAILURE,
  LOAD_RECOMMENDED_ANIMALS_REQUEST,
  LOAD_RECOMMENDED_ANIMALS_SUCCESS,
  LOAD_RECOMMENDED_ANIMALS_FAILURE,
  ANIFOLLOW_REQUEST,
  ANIFOLLOW_SUCCESS,
  ANIFOLLOW_FAILURE,
  ANIUNFOLLOW_REQUEST,
  ANIUNFOLLOW_SUCCESS,
  ANIUNFOLLOW_FAILURE,
} from '../reducers/animal';

import { ADD_NOTIFICATION_REQUEST } from '@/reducers/notification';
import NOTIFICATION_TYPE from '../../shared/constants/NOTIFICATION_TYPE';

// function addAniProfileAPI(data) {
//   return axios.post('/animal/animalform', data); //백엔드 연동시 필요
// }

function addAniProfileAPI(formData) {
  return axios.post('/animal/animalform', formData);
  // return axios.post('/animal/animalform', data, {
  //   withCredentials: true,
  // });

}
function* addAniProfile(action) {
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

function removeAniProfileAPI(id) {
  return axios.delete(`/animal/${id}`, {
    withCredentials: true,
  });
}
function* removeAniProfile(action) {
  try {
    const result = yield call(removeAniProfileAPI, action.data);
    yield put({
      type: REMOVE_ANIPROFILE_SUCCESS,
      data: result.data.animalId,
    });
  } catch (err) {
    yield put({
      type: REMOVE_ANIPROFILE_FAILURE,
      error: err.response?.data || err.message,
    });
  }
}

function loadAniFollowersAPI(id) {
  return axios.get(`/animal/${id}/followers`);
}
function* loadAniFollowers(action) {
  try {
    const result = yield call(loadAniFollowersAPI, action.data);
    yield put({
      type: LOAD_ANIFOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ANIFOLLOWERS_FAILURE,
      error: err.response?.data || err.message,
    });
  }
}

function loadAniFollowingsAPI(id) {
  return axios.get(`/animal/${id}/followings`);
}
function* loadAniFollowings(action) {
  try {
    const result = yield call(loadAniFollowingsAPI, action.data);
    yield put({
      type: LOAD_ANIFOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ANIFOLLOWINGS_FAILURE,
      error: err.response?.data || err.message,
    });
  }
}

function aniFollowAPI({ targetAnimalId, myAnimalId }) {
  return axios.patch(`/animal/${targetAnimalId}/follow`, { myAnimalId });
}
function* aniFollow(action) {
  try {
    const response = yield call(aniFollowAPI, action.data);
    console.log("✅ saga response:", response);
    yield put({
      type: ANIFOLLOW_SUCCESS,
      data: response.data,
    });

    // 알림
    console.log("🐕‍🦺 action.data.myAnimalId : ", action.data.myAnimalId);
    console.log("🐕‍🦺 ction.data.targetAnimalId : ", action.data.targetAnimalId);
    yield put({
      type: ADD_NOTIFICATION_REQUEST,
      data: {
        notiType: NOTIFICATION_TYPE.ANIMAL_FRIENDS,
        SenderId: action.data.myAnimalId,
        ReceiverId: action.data.targetAnimalId,
      },
    });
    // E 알림 

  } catch (err) {
    console.error("❌ saga error:", err);
    yield put({
      type: ANIFOLLOW_FAILURE,
      error: err.response?.data || err.message,
    });
  }
}

function aniUnFollowAPI({ targetAnimalId, myAnimalId }) {
  return axios.delete(`/animal/${targetAnimalId}/follow`, {
    data: { myAnimalId },
  });
}
function* aniUnFollow(action) {
  try {
    const response = yield call(aniUnFollowAPI, action.data);
    yield put({
      type: ANIUNFOLLOW_SUCCESS,
      data: response.data,
    });
  } catch (err) {
    yield put({
      type: ANIUNFOLLOW_FAILURE,
      error: err.response?.data || err.message,
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

function loadRecommendedAnimalsAPI(id) {
  return axios.get(`/animal/${id}/recommendations`);
}
function* loadRecommendedAnimals(action) {
  try {
    const result = yield call(loadRecommendedAnimalsAPI, action.data);
    yield put({ type: LOAD_RECOMMENDED_ANIMALS_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_RECOMMENDED_ANIMALS_FAILURE, error: err.response?.data });
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
function* watchLoadAniFollowers() {
  yield takeLatest(LOAD_ANIFOLLOWERS_REQUEST, loadAniFollowers);
}
function* watchLoadAniFollowings() {
  yield takeLatest(LOAD_ANIFOLLOWINGS_REQUEST, loadAniFollowings);
}
function* watchRemoveAniProfile() {
  yield takeLatest(REMOVE_ANIPROFILE_REQUEST, removeAniProfile);
}
function* watchLoadRecommendedAnimals() {
  yield takeLatest(LOAD_RECOMMENDED_ANIMALS_REQUEST, loadRecommendedAnimals);
}
function* watchAniFollow() {
  yield takeLatest(ANIFOLLOW_REQUEST, aniFollow);
}
function* watchAniUnFollow() {
  yield takeLatest(ANIUNFOLLOW_REQUEST, aniUnFollow);
}
export default function* animalSaga() {
  yield all([
    fork(watchAddAniProfile),
    fork(watchLoadAnimalProfile),
    fork(watchLoadAnimalList),
    fork(watchRemoveAniProfile),
    fork(watchLoadAniFollowers),
    fork(watchLoadAniFollowings),
    fork(watchLoadRecommendedAnimals),
    fork(watchAniFollow),
    fork(watchAniUnFollow),
  ]);
}
