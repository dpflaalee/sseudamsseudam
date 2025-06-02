import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from '../reducers/todolist';

function loadTodolistApi() {
  return axios.get('/api/todolist');
}
 
function* loadTodolist() {
  try {
    const result = yield call(loadTodolistApi);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    yield put({
      type: LOAD_TODOS_FAILURE,
      error: error.response.data
    });
  }
}

//2) ACTION 기능 추가
function* watchLoad() {
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodolist);
}

///1) all
export default function* todolistSaga() {
  yield all([
      fork(watchLoad),
  ]);
  // yield takeLatest(LOAD_TODOS_REQUEST, loadTodos);
}

/*
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from '../reducers/todo';

function loadTodosAPI() {
  return axios.get('/api/todos'); // 서버에서 모든 할 일 목록 가져오기
}

function* loadTodos() {
  try {
    const result = yield call(loadTodosAPI);
    yield put({ type: LOAD_TODOS_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_TODOS_FAILURE, error: err.response.data });
  }
}

export default function* todoSaga() {
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodos);
}
*/