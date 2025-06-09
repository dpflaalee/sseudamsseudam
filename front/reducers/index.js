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
        todolist,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
