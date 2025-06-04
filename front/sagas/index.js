import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import complainSaga from './complain';
import userSaga from './user';
import notificaionSaga from './notification';
import animalSaga from './animal';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(complainSaga),
    fork(userSaga),
    fork(notificaionSaga),
    fork(animalSaga),

  ]);
}