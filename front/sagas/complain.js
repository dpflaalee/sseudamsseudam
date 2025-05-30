import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import {
  LOAD_COMPLAIN_REQUEST, LOAD_COMPLAIN_SUCCESS, LOAD_COMPLAIN_FAILURE,
  ADD_COMPLAIN_REQUEST, ADD_COMPLAIN_SUCCESS, ADD_COMPLAIN_FAILURE,
  REMOVE_COMPLAIN_REQUEST, REMOVE_COMPLAIN_SUCCESS, REMOVE_COMPLAIN_FAILURE
} from '../reducers/complain';

//////////////////////////////////////////////////////////
function loadComplainAPI(data) {
  return axios.get(`/admin/complain`);
}

function* loadComplain(action) {
  try {
    const result = yield call(loadComplainAPI, action.data);
    yield put({
      type: LOAD_COMPLAIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('saga: complain : loadComplain : ', err);
    yield put({
      type: LOAD_COMPLAIN_FAILURE,
      error: err.response.data,
    });
  }
}



function addComplainAPI(data) {
  //return axios.post(`/admin/complain`);
}

function* addComplain(action) {
  try {
    //const result = yield call(addComplainAPI, action.data);
    console.log('🦞 sagas:  addComplain : ', action.data);
    yield put({
      type: ADD_COMPLAIN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.log('🚨 saga : addComplain : error : ', err);
    yield put({
      type: ADD_COMPLAIN_FAILURE,
      error: err.response.data,
    });
  }
}

function removeComplainAPI(data) {
  return axios.delete(`/admin/complain`);
}

function* removeComplain(action) {
  try {
    const result = yield call(removeComplainAPI, action.data);
    yield put({
      type: REMOVE_COMPLAIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('saga: complain : removeComplain : ', err);
    yield put({
      type: REMOVE_COMPLAIN_FAILURE,
      error: err.response.data,
    });
  }
}
///////////////////////////////////////////////////////


//////////////////////////
function* watchLoadComplain() {
  yield throttle(5000, LOAD_COMPLAIN_REQUEST, loadComplain);
}

function* watchAddComplain() {
  console.log('🍻 watchAddComplain');
  yield takeLatest(ADD_COMPLAIN_REQUEST, addComplain);
}

function* watchRemoveComplain() {
  yield takeLatest(REMOVE_COMPLAIN_REQUEST, removeComplain);
}

/////////////////////
export default function* complainSaga() {
  yield all([  //  all - 동시에 배열로 받은 fork들을 동시에 실행 
    fork(watchLoadComplain),
    fork(watchAddComplain),
    fork(watchRemoveComplain),
  ]);
}