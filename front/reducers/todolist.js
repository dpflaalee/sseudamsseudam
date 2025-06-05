import React from 'react';
import produce from 'immer';

export const initialState = {
  todos: [],

  loadTodolistLoading: false,
  loadTodolistDone: false,
  loadTodolistError: null,
  
  addTodolistLoading: false,
  addTodolistDone: false,
  addTodolistError: null,
};

export const ADD_TODOLIST_REQUEST = 'ADD_TODOLIST_REQUEST';
export const ADD_TODOLIST_SUCCESS = 'ADD_TODOLIST_SUCCESS';
export const ADD_TODOLIST_FAILURE = 'ADD_TODOLIST_FAILURE';
 
export const LOAD_TODOLIST_REQUEST = 'LOAD_TODOLIST_REQUEST';
export const LOAD_TODOLIST_SUCCESS = 'LOAD_TODOLIST_SUCCESS';
export const LOAD_TODOLIST_FAILURE = 'LOAD_TODOLIST_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_TODOLIST_REQUEST:
        draft.addTodolistLoading = true;
        draft.addTodolistDone = false;
        draft.addTodolistError = null;
        break;
    case ADD_TODOLIST_SUCCESS:
        draft.addTodolistLoading = false;
        draft.addTodolistDone = true;
        draft.todos = action.data;
        break;
    case ADD_TODOLIST_FAILURE:
        draft.addTodolistLoading = false;
        draft.addTodolistError = action.error;
        break;
    case LOAD_TODOLIST_REQUEST:
        draft.loadTodolistLoading = true;
        draft.loadTodolistDone = false;
        draft.loadTodolistError = null;
        break;
    case LOAD_TODOLIST_SUCCESS:
        draft.loadTodolistLoading = false;
        draft.loadTodolistDone = true;
        draft.todos = action.data;
        break;
    case LOAD_TODOLIST_FAILURE:
        draft.loadTodolistLoading = false;
        draft.loadTodolistError = action.error;
        break;
    default:
      break;
  }
});

export default reducer;