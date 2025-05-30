import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

<<<<<<< HEAD
=======
import post from './post';
>>>>>>> origin/SH_0529
import complain from './complain';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
<<<<<<< HEAD
        case HYDRATE:
            console.log('HYDRATE', action);
            return action.payload;
        default: {
            const combinedReducer = combineReducers({
                complain,
            });
            return combinedReducer(state, action);
        }
=======
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return { ...state }
>>>>>>> origin/SH_0529
    }
  },
  post,
  complain,
});
export default rootReducer;
