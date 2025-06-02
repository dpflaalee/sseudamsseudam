import React from 'react';
import produce from 'immer';

export const initialState = {
  todos: null,

  loadTodolistLoading: false,
  loadTodolistDone: false,
  loadTodolistError: null,
};
 
export const LOAD_TODOLIST_REQUEST = 'LOAD_TODOLIST_REQUEST';
export const LOAD_TODOLIST_SUCCESS = 'LOAD_TODOLIST_SUCCESS';
export const LOAD_TODOLIST_FAILURE = 'LOAD_TODOLIST_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_TODOLIST_REQUEST:
        draft.loadTodolistLoading = true;
        draft.loadTodolistDone = false;
        draft.loadTodolistError = null;
        break;
    case LOAD_TODOLIST_SUCCESS:
        draft.loadTodolistLoading = false;
        draft.loadTodolistDone = true;
        todos = action.data;
        break;
    case LOAD_TODOLIST_FAILURE:
        draft.loadTodolistLoading = false;
        draft.loadTodolistError =- action.error;
        break;
    default:
      break;
  }
});

export default reducer;