import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import post from './post';
import user from './user';
import complain from './complain';
import animal from './animal';
import notification from './notification';
import todolist from './todolist';

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
      });
      return combinedReducer(state, action);
    }
<<<<<<< HEAD
  },
  user,
  post,
  complain,
  animal,
  notification,
  todolist,
});
=======
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
//     }
//   },
//   user,
//   post,
//   complain,
//   animal,
//   notification,
// });
>>>>>>> 40eb36b40a243cdce7d3730a781b1a858dec2d91
export default rootReducer;
