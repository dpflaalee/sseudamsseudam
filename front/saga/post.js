import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS, 
} from '../reducers/post';

const dummyPost = (content) => ({
  id: shortId.generate(),
  content,
  Images: [],
  Comments: [],
  createdAt: new Date().toISOString(),
});

function addPostAPI(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    //const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: dummyPost(action.data), // result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost); 
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}