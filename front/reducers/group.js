import produce from 'immer';

// Action Types
//그룹 리스트 로드
export const LOAD_GROUPS_REQUEST = 'LOAD_GROUPS_REQUEST';
export const LOAD_GROUPS_SUCCESS = 'LOAD_GROUPS_SUCCESS';
export const LOAD_GROUPS_FAILURE = 'LOAD_GROUPS_FAILURE';

//그룹 생성
export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';

//그룹 업데이트
export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';
export const UPDATE_GROUP_FAILURE = 'UPDATE_GROUP_FAILURE';

//그룹 삭제
export const DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';

//멤버 리스트 조회
export const LOAD_MEMBERS_REQUEST = 'LOAD_MEMBERS_REQUEST';
export const LOAD_MEMBERS_SUCCESS = 'LOAD_MEMBERS_SUCCESS';
export const LOAD_MEMBERS_FAILURE = 'LOAD_MEMBERS_FAILURE';

//강퇴
export const KICK_MEMBER_REQUEST = 'KICK_MEMBER_REQUEST';
export const KICK_MEMBER_SUCCESS = 'KICK_MEMBER_SUCCESS';
export const KICK_MEMBER_FAILURE = 'KICK_MEMBER_FAILURE';

//방장권한위임
export const TRANSFER_OWNERSHIP_REQUEST = 'TRANSFER_OWNERSHIP_REQUEST';
export const TRANSFER_OWNERSHIP_SUCCESS = 'TRANSFER_OWNERSHIP_SUCCESS';
export const TRANSFER_OWNERSHIP_FAILURE = 'TRANSFER_OWNERSHIP_FAILURE';

//가입 신청
export const APPLY_GROUP_REQUEST = 'APPLY_GROUP_REQUEST';
export const APPLY_GROUP_SUCCESS = 'APPLY_GROUP_SUCCESS';
export const APPLY_GROUP_FAILURE = 'APPLY_GROUP_FAILURE';

//가입 요청 불러오기
export const LOAD_JOIN_REQUESTS_REQUEST = 'LOAD_JOIN_REQUESTS_REQUEST';
export const LOAD_JOIN_REQUESTS_SUCCESS = 'LOAD_JOIN_REQUESTS_SUCCESS';
export const LOAD_JOIN_REQUESTS_FAILURE = 'LOAD_JOIN_REQUESTS_FAILURE';

//승인
export const APPROVE_JOIN_REQUEST = 'APPROVE_JOIN_REQUEST';
//거절
export const REJECT_JOIN_REQUEST = 'REJECT_JOIN_REQUEST';

export const initialState = {
  // 그룹 목록 불러오기
  loadGroupsLoading: false,
  loadGroupsDone: false,
  loadGroupsError: null,

  // 그룹 생성
  createGroupLoading: false,
  createGroupDone: false,
  createGroupError: null,

  // 그룹 수정
  updateGroupLoading: false,
  updateGroupDone: false,
  updateGroupError: null,

  // 그룹 삭제
  deleteGroupLoading: false,
  deleteGroupDone: false,
  deleteGroupError: null,

  // 그룹 멤버 불러오기
  loadMembersLoading: false,
  loadMembersDone: false,
  loadMembersError: null,

  // 멤버 강퇴
  kickMemberLoading: false,
  kickMemberDone: false,
  kickMemberError: null,

  // 권한 위임
  transferOwnershipLoading: false,
  transferOwnershipDone: false,
  transferOwnershipError: null,

  // 가입 요청 신청
  applyGroupLoading: false,
  applyGroupDone: false,
  applyGroupError: null,

  // 가입 요청 불러오기 (방장용)
  loadJoinRequestsLoading: false,
  loadJoinRequestsDone: false,
  loadJoinRequestsError: null,

  // 가입 요청 승인
  approveJoinRequestLoading: false,
  approveJoinRequestDone: false,
  approveJoinRequestError: null,

  // 가입 요청 거절
  rejectJoinRequestLoading: false,
  rejectJoinRequestDone: false,
  rejectJoinRequestError: null,

  groups: [],        // 그룹 리스트
  members: [],       // 현재 그룹의 멤버들
  joinRequests: [],  // 가입 요청 목록
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_GROUPS_REQUEST:
      case CREATE_GROUP_REQUEST:
      case UPDATE_GROUP_REQUEST:
      case DELETE_GROUP_REQUEST:
      case LOAD_MEMBERS_REQUEST:
      case KICK_MEMBER_REQUEST:
      case TRANSFER_OWNERSHIP_REQUEST:
      case APPLY_GROUP_REQUEST:
      case LOAD_JOIN_REQUESTS_REQUEST:
        draft.isLoading = true;
        draft.error = null;
        break;

      case LOAD_GROUPS_SUCCESS:
        draft.groups = action.data;
        draft.isLoading = false;
        break;

      case CREATE_GROUP_SUCCESS:
        draft.groups.unshift(action.data);
        draft.isLoading = false;
        break;

      case UPDATE_GROUP_SUCCESS:
        draft.groups = draft.groups.map((group) =>
          group.id === action.data.id ? action.data : group
        );
        draft.isLoading = false;
        break;

      case DELETE_GROUP_SUCCESS:
        draft.groups = draft.groups.filter(
          (group) => group.id !== action.data
        );
        draft.isLoading = false;
        break;

      case LOAD_MEMBERS_SUCCESS:
        draft.members = action.data;
        draft.isLoading = false;
        break;

      case KICK_MEMBER_SUCCESS:
        draft.members = draft.members.filter((m) => m.id !== action.data);
        draft.isLoading = false;
        break;

      case TRANSFER_OWNERSHIP_SUCCESS:
        draft.members = draft.members.map((m) => ({
          ...m,
          isLeader: m.id === action.data,
        }));
        draft.isLoading = false;
        break;

      case APPLY_GROUP_SUCCESS:
        draft.isLoading = false;
        break;

      case LOAD_JOIN_REQUESTS_SUCCESS:
        draft.joinRequests = action.data;
        draft.isLoading = false;
        break;

      case APPROVE_JOIN_REQUEST:
        draft.joinRequests = draft.joinRequests.filter((r) => r.id !== action.data);
        break;

      case REJECT_JOIN_REQUEST:
        draft.joinRequests = draft.joinRequests.filter((r) => r.id !== action.data);
        break;

      case LOAD_GROUPS_FAILURE:
      case CREATE_GROUP_FAILURE:
      case UPDATE_GROUP_FAILURE:
      case DELETE_GROUP_FAILURE:
      case LOAD_MEMBERS_FAILURE:
      case KICK_MEMBER_FAILURE:
      case TRANSFER_OWNERSHIP_FAILURE:
      case APPLY_GROUP_FAILURE:
      case LOAD_JOIN_REQUESTS_FAILURE:
        draft.isLoading = false;
        draft.error = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;