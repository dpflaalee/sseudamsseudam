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
} from '../reducers/animal';

function addAniprofileAPI(data) {
  return axios.post('/api/animal', data); //백엔드 연동시 필요
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

export default function* animalSaga() {
  yield all([
    takeLatest(ADD_ANIPROFILE_REQUEST, addAniProfile),
  ]);
}

