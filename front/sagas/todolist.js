import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_TODOLIST_REQUEST,
  LOAD_TODOLIST_SUCCESS,
  LOAD_TODOLIST_FAILURE,

  ADD_TODOLIST_REQUEST,
  ADD_TODOLIST_SUCCESS,
  ADD_TODOLIST_FAILURE
} from '../reducers/todolist';

function loadTodolistApi() {
  return axios.get('/api/calendars');
}
 
function* loadTodolist() {
  try {
    const result = yield call(loadTodolistApi);
    yield put({
      type: LOAD_TODOLIST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_TODOLIST_FAILURE,
      error: error.response.data
    });
  }
}

function addTodolistApi(data) {
  return axios.post('/api/calendars', data); // 일정 추가
}

function* addTodolist(action) {
  try {
    const result = yield call(addTodolistApi, action.data); // action.data는 { title, content, startDate, endDate }
    yield put({
      type: ADD_TODOLIST_SUCCESS,
      data: result.data, // 추가 후 전체 목록을 반환받을 경우
    });
  } catch (error) {
    yield put({
      type: ADD_TODOLIST_FAILURE,
      error: error.response?.data || error.message,
    });
  }
}

function* watchLoadTodolist() {
  yield takeLatest(LOAD_TODOLIST_REQUEST, loadTodolist);
}

function* watchAddTodolist() {
  yield takeLatest(ADD_TODOLIST_REQUEST, addTodolist);
}

export default function* todolistSaga() {
  yield all([
    fork(watchLoadTodolist),
    fork(watchAddTodolist),
  ]);
}

// //2) ACTION 기능 추가
// function* watchLoad() {
//   yield takeLatest(LOAD_TODOLIST_REQUEST, loadTodolist);
// }

// ///1) all
// export default function* todolistSaga() {
//   yield all([
//       fork(watchLoad),
//   ]);
//   // yield takeLatest(LOAD_TODOS_REQUEST, loadTodos);
// }

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