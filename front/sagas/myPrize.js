import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_MY_PRIZES_REQUEST, LOAD_MY_PRIZES_SUCCESS, LOAD_MY_PRIZES_FAILURE,
  USE_MY_PRIZE_REQUEST, USE_MY_PRIZE_SUCCESS, USE_MY_PRIZE_FAILURE,
} from '../reducers/myPrize';

// --- API ---
function loadMyPrizesAPI() {
  return axios.get('/my-prizes');
}

function* loadMyPrizes() {
  try {
    const result = yield call(loadMyPrizesAPI);
    yield put({ type: LOAD_MY_PRIZES_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_MY_PRIZES_FAILURE, error: err.response?.data || err.message });
  }
}

function useMyPrizeAPI(id) {
  return axios.post(`/my-prizes/use/${id}`);
}

function* useMyPrize(action) {
  try {
    const result = yield call(useMyPrizeAPI, action.data);
    yield put({ type: USE_MY_PRIZE_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: USE_MY_PRIZE_FAILURE, error: err.response?.data || err.message });
  }
}

// --- Watchers ---
function* watchLoadMyPrizes() {
  yield takeLatest(LOAD_MY_PRIZES_REQUEST, loadMyPrizes);
}

function* watchUseMyPrize() {
  yield takeLatest(USE_MY_PRIZE_REQUEST, useMyPrize);
}

// --- Root Saga ---
export default function* myPrizeSaga() {
  yield all([
    fork(watchLoadMyPrizes),
    fork(watchUseMyPrize),
  ]);
}
