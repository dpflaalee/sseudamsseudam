import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import complainSaga from './complain';
import userSaga from './user';
import notificationSaga from './notification';
import animalSaga from './animal';
<<<<<<< HEAD
import groupSaga from './group';
=======
import prizeSaga from './prize';         
import myPrizeSaga from './myPrize';    
>>>>>>> 4c5c02d5e404992511331bcf8e0daac2a97d7e4e

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(complainSaga),
    fork(userSaga),
    fork(notificationSaga),
    fork(animalSaga),
<<<<<<< HEAD
    fork(groupSaga)

=======
    fork(prizeSaga),       
    fork(myPrizeSaga),     
>>>>>>> 4c5c02d5e404992511331bcf8e0daac2a97d7e4e
  ]);
}
