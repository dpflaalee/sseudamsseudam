import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import {
    LOAD_NOTIFICATION_REQUEST, LOAD_NOTIFICATION_SUCCESS, LOAD_NOTIFICATION_FAILURE,
    ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_FAILURE,
    REMOVE_NOTIFICATION_REQUEST, REMOVE_NOTIFICATION_SUCCESS, REMOVE_NOTIFICATION_FAILURE
} from '../reducers/notification';

//////////////////////////////////////////////////////////
function loadNotificaionAPI() {
    return axios.get('/notification');
}

function* loadNotificaion(action) {
    try {
        const result = yield call(loadNotificaionAPI, action.data);
        yield put({
            type: LOAD_NOTIFICATION_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log('🚨 notificaionSaga : loadNotificaion : ', err);
        next(err);
        yield put({
            type: LOAD_NOTIFICATION_FAILURE,
            error: err.response.data,
        });
    }
}



function addNotificaionAPI(data) {
    console.log('🔱 API로 넘길 데이터:', data);
    return axios.post('/notification', data); // 
}

function* addNotificaion(action) {
    try {
        const result = yield call(addNotificaionAPI, action.data);
        console.log('🦞 notificaionSaga:  addNotificaion : ', action.data);
        yield put({
            type: ADD_NOTIFICATION_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log('🚨 notificaionSaga : addNotificaion : ', err);
        yield put({
            type: ADD_NOTIFICATION_FAILURE,
            error: err.response.data,
        });
    }
}

function removeNotificationAPI(data) {
    return axios.delete('/notification');
}

function* removeNotification(action) {
    try {
        const result = yield call(removeNotificationAPI, action.data);
        yield put({
            type: REMOVE_NOTIFICATION_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log('🚨 complainSaga : removeComplain : ', err);
        yield put({
            type: REMOVE_NOTIFICATION_FAILURE,
            error: err.response.data,
        });
    }
}
///////////////////////////////////////////////////////


//////////////////////////
function* watchLoadNotification() {
    yield throttle(5000, LOAD_NOTIFICATION_REQUEST, loadNotificaion);
}

function* watchAddNotification() {
    yield takeLatest(ADD_NOTIFICATION_REQUEST, addNotificaion);
}

function* watchRemoveNotificion() {
    yield takeLatest(REMOVE_NOTIFICATION_REQUEST, removeNotification);
}

/////////////////////
export default function* complainSaga() {
    yield all([  //  all - 동시에 배열로 받은 fork들을 동시에 실행 
        fork(watchLoadNotification),
        fork(watchAddNotification),
        fork(watchRemoveNotificion),
    ]);
}