import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_PRIZE_REQUEST, ADD_PRIZE_SUCCESS, ADD_PRIZE_FAILURE,
  LOAD_PRIZES_REQUEST, LOAD_PRIZES_SUCCESS, LOAD_PRIZES_FAILURE,
  MODIFY_PRIZE_REQUEST, MODIFY_PRIZE_SUCCESS, MODIFY_PRIZE_FAILURE,
  REMOVE_PRIZE_REQUEST, REMOVE_PRIZE_SUCCESS, REMOVE_PRIZE_FAILURE,
  OPEN_RANDOM_BOX_REQUEST, OPEN_RANDOM_BOX_SUCCESS, OPEN_RANDOM_BOX_FAILURE,
  LOAD_RANDOM_BOX_LIST_REQUEST, LOAD_RANDOM_BOX_LIST_SUCCESS, LOAD_RANDOM_BOX_LIST_FAILURE,
  LOAD_CATEGORY_RANDOM_BOXES_REQUEST,LOAD_CATEGORY_RANDOM_BOXES_SUCCESS,LOAD_CATEGORY_RANDOM_BOXES_FAILURE,
} from '../reducers/prize';

function addPrizeAPI(data) {
  return axios.post('/admin/prizes', data);
}

function* addPrize(action) {
  try {
    const result = yield call(addPrizeAPI, action.data);
    yield put({ type: ADD_PRIZE_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: ADD_PRIZE_FAILURE, error: err.response?.data || err.message });
  }
}

function loadPrizesAPI() {
  return axios.get('/admin/prizes');
}

function* loadPrizes() {
  try {
    const result = yield call(loadPrizesAPI);
    yield put({ type: LOAD_PRIZES_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_PRIZES_FAILURE, error: err.response?.data || err.message });
  }
}

function modifyPrizeAPI(data) {
  const { id, ...rest } = data;
  return axios.patch(`/admin/prizes/${data.id}`, data);
}

function* modifyPrize(action) {
  try {
    const result = yield call(modifyPrizeAPI, action.data);
    yield put({ type: MODIFY_PRIZE_SUCCESS, data: result.data });
  } catch (err) {
    console.error('modifyPrize error:', err);
    yield put({ type: MODIFY_PRIZE_FAILURE, error: err.response?.data || err.message });
  }
}

function removePrizeAPI(id) {
  return axios.delete(`/admin/prizes/${id}`);
}

function* removePrize(action) {
  try {
    yield call(removePrizeAPI, action.data);
    yield put({ type: REMOVE_PRIZE_SUCCESS, data: action.data });
  } catch (err) {
    yield put({ type: REMOVE_PRIZE_FAILURE, error: err.response?.data || err.message });
  }
}

function openRandomBoxAPI(category) {
  return axios.post(`/api/open-random-box?category=${category}`);
}

function* openRandomBox(action) {
  try {
    const result = yield call(openRandomBoxAPI, action.data);
    yield put({ type: OPEN_RANDOM_BOX_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: OPEN_RANDOM_BOX_FAILURE, error: err.response?.data || err.message });
  }
}

function loadRandomBoxListAPI() {
  return axios.get('/random-boxes');
}

function* loadRandomBoxList() {
  try {
    const result = yield call(loadRandomBoxListAPI);
    console.log("🎯 랜덤박스 리스트 응답 데이터:", result.data);

    yield put({
      type: LOAD_RANDOM_BOX_LIST_SUCCESS,
      data: result.data.data || [],  // 방어적 처리
    });
  } catch (err) {
    yield put({
      type: LOAD_RANDOM_BOX_LIST_FAILURE,
      error: err.response?.data?.message || '서버 오류가 발생했습니다.',
    });
  }
}

function loadCategoryRandomBoxesAPI(userId) {
  return axios.get(`/random-boxes/by-user-categories?userId=${userId}`);
}

function* loadCategoryRandomBoxes() {
  const userId = yield select((state) => {
  console.log(state.user); // 여기서 상태를 출력
  return state.user.User?.id; // 또는 state.user.id
});
  
  // 로그인되지 않은 경우, API 호출을 막고 에러 메시지를 디스패치합니다.
  if (!userId) {
    yield put({
      type: LOAD_CATEGORY_RANDOM_BOXES_FAILURE,
      error: '사용자가 로그인되지 않았습니다.',
    });
    return;
  }

  try {
    const result = yield call(loadCategoryRandomBoxesAPI, userId);
    yield put({
      type: LOAD_CATEGORY_RANDOM_BOXES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || '알 수 없는 오류가 발생했습니다.';
    yield put({
      type: LOAD_CATEGORY_RANDOM_BOXES_FAILURE,
      error: errorMessage,
    });
  }
}




function* watchAddPrize() {
  yield takeLatest(ADD_PRIZE_REQUEST, addPrize);
}

function* watchLoadPrizes() {
  yield takeLatest(LOAD_PRIZES_REQUEST, loadPrizes);
}

function* watchModifyPrize() {
  yield takeLatest(MODIFY_PRIZE_REQUEST, modifyPrize);
}

function* watchRemovePrize() {
  yield takeLatest(REMOVE_PRIZE_REQUEST, removePrize);
}

function* watchOpenRandomBox() {
  yield takeLatest(OPEN_RANDOM_BOX_REQUEST, openRandomBox);
}

function* watchLoadRandomBoxList() {
  yield takeLatest(LOAD_RANDOM_BOX_LIST_REQUEST, loadRandomBoxList);
}

function* watchLoadCategoryRandomBoxes() {
  yield takeLatest(LOAD_CATEGORY_RANDOM_BOXES_REQUEST, loadCategoryRandomBoxes);
}

export default function* prizeSaga() {
  yield all([
    fork(watchAddPrize),
    fork(watchLoadPrizes),
    fork(watchModifyPrize),
    fork(watchRemovePrize),
    fork(watchOpenRandomBox),
    fork(watchLoadRandomBoxList),
    fork(watchLoadCategoryRandomBoxes),
  ]);
}
