<<<<<<< HEAD
import {HTPARTE, HYDRATE} from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import post from './post';

const rootReducer = combineReducers({
  index: ( state={}, action ) => {
    switch (action.type) {
    case HYDRATE : 
      console.log('HYDRATE', action);
      return { ...state, ...action.payload };
    default:
      return { ...state }
    }
  },
  post,
});
export default rootReducer;
=======
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';


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
            });
            return combinedReducer(state, action);
        }
    }
};

export default rootReducer;
>>>>>>> fa4b5d9f4792afd91842fd14171d2d4b9982d2e5
