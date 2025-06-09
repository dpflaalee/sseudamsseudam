import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import post from './post';
import user from './user';
import complain from './complain';
import animal from './animal';
import notification from './notification';
<<<<<<< HEAD
import group from './group';

// (이전상태, 액션) => 다음상태
// const rootReducer = (state, action) => {
//   switch (action.type) {
//     case HYDRATE:
//       console.log('HYDRATE', action);
//       return action.payload;
//     default: {
//       const combinedReducer = combineReducers({
//         user,
//         post,
//         complain,
//         animal,
//         notification,
//       });
//       return combinedReducer(state, action);
=======
import prize from './prize';
import myPrize from './myPrize';

// (이전상태, 액션) => 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        complain,
        animal,
        notification,
        prize,
        myPrize,
      });
      return combinedReducer(state, action);
    }
  }
};
// const rootReducer = combineReducers({
//   index: (state = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         console.log('HYDRATE', action);
//         return { ...state, ...action.payload };
//       default:
//         return { ...state }
>>>>>>> 4c5c02d5e404992511331bcf8e0daac2a97d7e4e
//     }
//   }
// };
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return { ...state }
    }
  },
  user,
  post,
  complain,
  animal,
  notification,
  group,
});
export default rootReducer;
