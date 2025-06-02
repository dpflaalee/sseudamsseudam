import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import shortId from 'shortid';

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
} from '../reducers/post';

const dummyPost = (content) => ({
  id: shortId.generate(),
  content,
  Images: [{ src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7C9h2MUO22qNx2xnfmeFA_WHiTL1_JyFEg&s' }],
  createdAt: new Date().toISOString(),
});

function addPostAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: dummyPost() }); // 더미 데이터 반환
    }, 500); // 500ms 후에 더미 데이터 반환
  });
}

function* addPost(action) {
  try {
    //const result = yield call(addPostAPI, action.data);
    const result = yield call(addPostAPI);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function updatePostAPI(data) {
  return axios.patch(`/post/${data.PostId}`, data);
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchUpdatePost),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}