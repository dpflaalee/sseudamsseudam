import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import {
    LOAD_NOTIFICATION_REQUEST, LOAD_NOTIFICATION_SUCCESS, LOAD_NOTIFICATION_FAILURE,
    ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_FAILURE,
    REMOVE_NOTIFICATION_REQUEST, REMOVE_NOTIFICATION_SUCCESS, REMOVE_NOTIFICATION_FAILURE
} from '../reducers/notification';

//////////////////////////////////////////////////////////
function loadNotificationAPI(userId) {
    return axios.get('/notification', {
        params: 1,
    });
}

function* loadNotification(action) {
    try {
        const result = yield call(loadNotificationAPI, action.data);
        yield put({
            type: LOAD_NOTIFICATION_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log('🚨 notificaionSaga : loadNotification : ', err);
        next(err);
        yield put({
            type: LOAD_NOTIFICATION_FAILURE,
            error: err.response.data,
        });
    }
}



function addNotificationAPI(data) {
    console.log('🔱 API로 넘길 데이터:', data);
    return axios.post('/notification', data); // 
}

function* addNotification(action) {
    try {
        const result = yield call(addNotificationAPI, action.data);
        console.log('🦞 notificationSaga:  addNotification : ', action.data);
        yield put({
            type: ADD_NOTIFICATION_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log('🚨 notificationSaga : addNotification : ', err);
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
    yield throttle(5000, LOAD_NOTIFICATION_REQUEST, loadNotification);
}

function* watchAddNotification() {
    yield takeLatest(ADD_NOTIFICATION_REQUEST, addNotification);
}

function* watchRemoveNotification() {
    yield takeLatest(REMOVE_NOTIFICATION_REQUEST, removeNotification);
}

/////////////////////
export default function* notificationSaga() {
    yield all([  //  all - 동시에 배열로 받은 fork들을 동시에 실행 
        fork(watchLoadNotification),
        fork(watchAddNotification),
        fork(watchRemoveNotification),
    ]);
}