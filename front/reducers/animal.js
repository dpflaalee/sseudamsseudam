import {produce} from 'immer';

export const initialState = {
  animals: [],  // 동물 프로필 리스트
  
  addaniprofileLoading: false,  //동물프로필 추가 시도중
  addaniprofileDone: false,
  addAniprofileError: null,

  removeAniprofileLoading: false, //프로필 제거 시도중
  removeAniprofileDone: false,
  removeAniprofileError: null,

  loadAniprofileLoading: false, //프로필 불러오기 시도중
  loadAniprofileDone: false, 
  loadAniprofileError: null,

  modifyAniprofileLoading: false, //프로필 수정 시도중
  modifyAniprofileDone: false,
  modifyAniporileError: null,
  
  anifollowLoading: false,  //팔로우 시도중
  anifollowDone: false,
  anifollowError: null,
  
  aniunfollowLoading: false,  //언팔로우 시도중
  aniunfollowDone: false,
  aniunfollowError: null,

  removeAnifollowLoading: false, //팔로워/팔로잉 제거 시도중
  removeAnifollowDone: false,
  removeAnifollowError: null,

  loadAnifollowersLoading: false,  //팔로워 불러오기 시도중
  loadAnifollowersDone: false,
  loadAnifollowersError: null,

  loadAnifollowingsLoading: false,  //팔로잉 불러오기 시도중
  loadAnifollowingsDone: false,
  loadAnifollowingsError: null,
}

export const ADD_ANIPROFILE_REQUEST = 'ADD_ANIPROFILE_REQUEST';
export const ADD_ANIPROFILE_SUCCESS = 'ADD_ANIPROFILE_SUCCESS';
export const ADD_ANIPROFILE_FAILURE = 'ADD_ANIPROFILE_FAILURE';

export const REMOVE_ANIPROFILE_REQUEST = 'REMOVE_ANIPROFILE_REQUEST';
export const REMOVE_ANIPROFILE_SUCCESS = 'REMOVE_ANIPROFILE_SUCCESS';
export const REMOVE_ANIPROFILE_FAILURE = 'REMOVE_ANIPROFILE_FAILURE';

export const LOAD_ANIPROFILE_REQUEST = 'LOAD_ANIPROFILE_REQUEST';
export const LOAD_ANIPROFILE_SUCCESS = 'LOAD_ANIPROFILE_SUCCESS';
export const LOAD_ANIPROFILE_FAILURE = 'LOAD_ANIPROFILE_FAILURE';

export const ANIFOLLOW_REQUEST = 'ANIFOLLOW_REQUEST';
export const ANIFOLLOW_SUCCESS = 'ANIFOLLOW_SUCCESS';
export const ANIFOLLOW_FAILURE = 'ANIFOLLOW_FAILURE';

export const ANIUNFOLLOW_REQUEST = 'ANIUNFOLLOW_REQUEST';
export const ANIUNFOLLOW_SUCCESS = 'ANIUNFOLLOW_SUCCESS';
export const ANIUNFOLLOW_FAILURE = 'ANIUNFOLLOW_FAILURE';

export const MODIFY_ANIPROFILE_REQUEST = 'MODIFY_ANIPROFILE_REQUEST';
export const MODIFY_ANIPROFILE_SUCCESS = 'MODIFY_ANIPROFILE_SUCCESS';
export const MODIFY_ANIPROFILE_FAILURE = 'MODIFY_ANIPROFILE_FAILURE';

export const REMOVE_ANIFOLLOW_REQUEST = 'REMOVE_ANIFOLLOW_REQUEST';
export const REMOVE_ANIFOLLOW_SUCCESS = 'REMOVE_ANIFOLLOW_SUCCESS';
export const REMOVE_ANIFOLLOW_FAILURE = 'REMOVE_ANIFOLLOW_FAILURE';

export const LOAD_ANIFOLLOWERS_REQUEST = 'LOAD_ANIFOLLOWERS_REQUEST';
export const LOAD_ANIFOLLOWERS_SUCCESS = 'LOAD_ANIFOLLOWERS_SUCCESS';
export const LOAD_ANIFOLLOWERS_FAILURE = 'LOAD_ANIFOLLOWERS_FAILURE';

export const LOAD_ANIFOLLOWINGS_REQUEST = 'LOAD_ANIFOLLOWINGS_REQUEST';
export const LOAD_ANIFOLLOWINGS_SUCCESS = 'LOAD_ANIFOLLOWINGS_SUCCESS';
export const LOAD_ANIFOLLOWINGS_FAILURE = 'LOAD_ANIFOLLOWINGS_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type){
    case ADD_ANIPROFILE_REQUEST:
      draft.addaniprofileLoading = true;
      draft.addaniprofileDone = false;
      draft.addAniprofileError = null;
      break;
    case ADD_ANIPROFILE_SUCCESS:
      draft.addaniprofileLoading = false;
      draft.addaniprofileDone = true;
      draft.animals.push(action.data);  // 프론트 메모리(redux)에 저장됨
      break;
    case ADD_ANIPROFILE_FAILURE:
      draft.addaniprofileLoading = false;
      draft.addAniprofileError = action.error;
      break;
    case LOAD_ANIPROFILE_REQUEST:
      draft.loadAniprofileLoading = true;
      draft.loadAniprofileDone = false;
      draft.loadAniprofileError = null;
      break;
    case LOAD_ANIPROFILE_SUCCESS:
      draft.loadAniprofileLoading = false;
      draft.loadAniprofileDone = true;
      draft.animals=action.data;
      break;
    case LOAD_ANIPROFILE_FAILURE:
      draft.loadAniprofileLoading = false;
      draft.loadAniprofileError = action.error;
      break;
    case ANIFOLLOW_REQUEST:
      draft.anifollowLoading = true;
      draft.anifollowDone = false;
      draft.anifollowError = null;
      break;
    case ANIFOLLOW_SUCCESS:
      draft.anifollowLoading = false;
      draft.anifollowDone = true;
      draft.animals.Followings.push({id: action.animalId});
      break;
    case ANIFOLLOW_FAILURE:
      draft.anifollowLoading = false;
      draft.anifollowError = action.error;
      break; 

    case ANIUNFOLLOW_REQUEST:
      draft.aniunfollowLoading = true;
      draft.aniunfollowDone = false;
      draft.aniunfollowError = null;
      break;
    case ANIUNFOLLOW_SUCCESS:
      draft.aniunfollowLoading = false;
      draft.aniunfollowDone = true;
      draft.animals = draft.animals.map((a) =>
        a.id === action.data ? { ...a, isFollowing: false } : a
      );
      break;
    case ANIUNFOLLOW_FAILURE:
      draft.aniunfollowLoading = false;
      draft.aniunfollowError = action.error;
      break;

    case REMOVE_ANIPROFILE_REQUEST:
      draft.removeAniprofileLoading = true;
      draft.removeAniprofileDone = false;
      draft.removeAniprofileError = null;
      break;
    case REMOVE_ANIPROFILE_SUCCESS:
      draft.removeAniprofileLoading = false;
      draft.removeAniprofileDone = true;
      draft.animals = draft.animals.filter((v) => v.id !== action.data);
      break;
    case REMOVE_ANIPROFILE_FAILURE:
      draft.removeAniprofileLoading = false;
      draft.removeAniprofileError = action.error;
      break;

    default:
      break;
  }
})
export default reducer;

// action creator
export const addAniProfile = (data) => ({
  type: ADD_ANIPROFILE_REQUEST,
  data,
});

export const loadAniProfiles = () => ({
  type: LOAD_ANIPROFILE_REQUEST,
});

export const aniUnfollow = (id) => ({
  type: ANIUNFOLLOW_REQUEST,
  data: id,
});

export const removeAniFollow = (id) => ({
  type: REMOVE_ANIPROFILE_REQUEST,
  data: id,
});