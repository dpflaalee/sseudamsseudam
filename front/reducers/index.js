import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import post from './post';
import user from './user';
import complain from './complain';
import animal from './animal';
import notification from './notification';
import todolist from './todolist';

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
  todolist,
});
export default rootReducer;
