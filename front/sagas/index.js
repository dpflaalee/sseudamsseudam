import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import complainSaga from './complain';
import userSaga from './user';
<<<<<<< HEAD
import notificationSaga from './notification';
=======
import notificaionSaga from './notification';
>>>>>>> 1d5fcbf98cddacc902b39a9662da621d641a87db
import animalSaga from './animal';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(complainSaga),
    fork(userSaga),
<<<<<<< HEAD
    fork(notificationSaga),
=======
    fork(notificaionSaga),
>>>>>>> 1d5fcbf98cddacc902b39a9662da621d641a87db
    fork(animalSaga),

  ]);
}