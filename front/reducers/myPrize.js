import produce from 'immer';

export const initialState = {
  myPrizes: [],

  loadMyPrizesLoading: false,
  loadMyPrizesDone: false,
  loadMyPrizesError: null,

  useMyPrizeLoading: false,
  useMyPrizeDone: false,
  useMyPrizeError: null,
};

export const LOAD_MY_PRIZES_REQUEST = 'LOAD_MY_PRIZES_REQUEST';
export const LOAD_MY_PRIZES_SUCCESS = 'LOAD_MY_PRIZES_SUCCESS';
export const LOAD_MY_PRIZES_FAILURE = 'LOAD_MY_PRIZES_FAILURE';

export const USE_MY_PRIZE_REQUEST = 'USE_MY_PRIZE_REQUEST';
export const USE_MY_PRIZE_SUCCESS = 'USE_MY_PRIZE_SUCCESS';
export const USE_MY_PRIZE_FAILURE = 'USE_MY_PRIZE_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch(action.type) {
    case LOAD_MY_PRIZES_REQUEST:
      draft.loadMyPrizesLoading = true;
      draft.loadMyPrizesDone = false;
      draft.loadMyPrizesError = null;
      break;
    case LOAD_MY_PRIZES_SUCCESS:
      draft.loadMyPrizesLoading = false;
      draft.loadMyPrizesDone = true;
      draft.myPrizes = action.data;
      break;
    case LOAD_MY_PRIZES_FAILURE:
      draft.loadMyPrizesLoading = false;
      draft.loadMyPrizesError = action.error;
      break;

    case USE_MY_PRIZE_REQUEST:
      draft.useMyPrizeLoading = true;
      draft.useMyPrizeDone = false;
      draft.useMyPrizeError = null;
      break;
    case USE_MY_PRIZE_SUCCESS:
      draft.useMyPrizeLoading = false;
      draft.useMyPrizeDone = true;
      // 사용한 쿠폰은 상태에서 바로 제거하거나 isRead, usedAt 상태를 업데이트 할 수 있음
      draft.myPrizes = draft.myPrizes.map(p =>
        p.id === action.data.id ? action.data : p
      );
      break;
    case USE_MY_PRIZE_FAILURE:
      draft.useMyPrizeLoading = false;
      draft.useMyPrizeError = action.error;
      break;

    default:
      break;
  }
});

export default reducer;

// 액션 생성 함수
export const loadMyPrizes = () => ({
  type: LOAD_MY_PRIZES_REQUEST,
});

export const useMyPrize = (id) => ({
  type: USE_MY_PRIZE_REQUEST,
  data: id,
});
