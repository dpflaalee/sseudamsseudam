import shortId from 'shortid';
import produce from 'immer';
import { faker } from '@faker-js/faker';
faker.seed(123);

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {id:1, nickname:'mymy'},
    content: '첫번째 게시글 #node',
    Images:[{ src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7C9h2MUO22qNx2xnfmeFA_WHiTL1_JyFEg&s' }],
  }],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const addPost = {  type:'ADD_POST', }
//////////  dummyPost
const dummyPost = (data)=>({
   //id: 2,
   id:shortId.generate() , 
   content: data, 
   Images: [],
   Comments : []
});

const dummyComment = (data)=>({
   //id: 2,
   id:shortId.generate() , 
   content: data,
});

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
      draft.imagePaths = [];
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
  }
});

export default reducer;