import produce from 'immer';

//-------------- Action Types---------------//

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
export const APPROVE_JOIN_SUCCESS = 'APPROVE_JOIN_SUCCESS';
export const APPROVE_JOIN_FAILURE = 'APPROVE_JOIN_FAILURE';
//거절
export const REJECT_JOIN_REQUEST = 'REJECT_JOIN_REQUEST';
export const REJECT_JOIN_SUCCESS = 'REJECT_JOIN_SUCCESS';
export const REJECT_JOIN_FAILURE = 'REJECT_JOIN_FAILURE';

//-------------- 초기값---------------//

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

//-------------- next---------------//

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
//------------------- 그룹관리 -------------------//
      //그룹불러오기
      case LOAD_GROUPS_REQUEST:
        draft.loadGroupsLoading = true;
        draft.loadGroupsDone = false;
        draft.loadGroupsError = null;
        break;
      case LOAD_GROUPS_SUCCESS:
        draft.loadGroupsLoading = false;
        draft.groups = action.data;
        draft.loadGroupsDone = true;
        break;
      case LOAD_GROUPS_FAILURE:
        draft.loadGroupsLoading = false;
        draft.loadGroupsError = action.error;
        break;       
      //그룹생성
      case CREATE_GROUP_REQUEST:
        draft.createGroupLoading = true;
        draft.createGroupDone = false;
        draft.createGroupError = null;
        break;
      case CREATE_GROUP_SUCCESS:
        draft.createGroupLoading = false;
        draft.groups.unshift(action.data);
        draft.createGroupDone=true;
        break;
      case CREATE_GROUP_FAILURE:
        draft.createGroupLoading = false;
        draft.createGroupError = action.error; 
        break;       
      //그룹 업데이트
      case UPDATE_GROUP_REQUEST:
        draft.updateGroupLoading = true;
        draft.updateGroupDone = false;
        draft.updateGroupError = null;
        break;
      case UPDATE_GROUP_SUCCESS:
        draft.updateGroupLoading = false;
        draft.groups = draft.groups.map((group) =>
          group.id === action.data.id ? action.data : group
        );
        draft.updateGroupDone=true;
        break;
      case UPDATE_GROUP_FAILURE:
        draft.updateGroupLoading = false;
        draft.updateGroupError = action.error;
        break;
      //그룹삭제
      case DELETE_GROUP_REQUEST:
        draft.deleteGroupLoading = true;
        draft.deleteGroupDone = false;
        draft.deleteGroupError = null;
        break;        
      case DELETE_GROUP_SUCCESS:
        draft.deleteGroupLoading = false;
        draft.groups = draft.groups.filter(
          (group) => group.id !== action.data
        );
        draft.deleteGroupDone=true;
        break;
      case DELETE_GROUP_FAILURE:
        draft.deleteGroupLoading = false;
        draft.deleteGroupError = action.error;
        break;

//------------------- 멤버관리 -------------------//
      //멤버 불러오기
      case LOAD_MEMBERS_REQUEST:
        draft.loadMembersLoading = true;
        draft.loadMembersDone = false;
        draft.loadMembersError = null;
        break;
      case LOAD_MEMBERS_SUCCESS:
        draft.loadMembersLoading = false;
        draft.members = action.data;
        draft.loadMembersDone = true;
        break;
      case LOAD_MEMBERS_FAILURE:
        draft.loadMembersLoading = false;
        draft.loadMembersError = action.error;
        break;
      //강퇴
      case KICK_MEMBER_REQUEST:
        draft.kickMemberLoading =true;
        draft.kickMemberDone = false;
        draft.kickMemberError = null;    
        break;   
      case KICK_MEMBER_SUCCESS:
        draft.kickMemberLoading = false;
        draft.members = draft.members.filter((m) => m.id !== action.data);
        draft.kickMemberDone=true
        break;
      case KICK_MEMBER_FAILURE:
        draft.kickMemberLoading =false;
        draft.kickMemberError = action.error;
        break;
      //권한위임
      case TRANSFER_OWNERSHIP_REQUEST:
        draft.transferOwnershipLoading = true;
        draft.transferOwnershipDone = false;
        draft.transferOwnershipError = null;
        break;       
      case TRANSFER_OWNERSHIP_SUCCESS:
        draft.transferOwnershipLoading = false;
        draft.members = draft.members.map((m) => ({
          ...m,
          isLeader: m.id === action.data,
        }));
        draft.transferOwnershipDone=true;
        break;
      case TRANSFER_OWNERSHIP_FAILURE:
        draft.transferOwnershipLoading = false;
        draft.transferOwnershipError = action.error;
        break;
      //가입신청
      case APPLY_GROUP_REQUEST:
        draft.applyGroupLoading = true;
        draft.applyGroupDone = false;
        draft.applyGroupError = null;       
        break;
      case APPLY_GROUP_SUCCESS:
        draft.applyGroupLoading = false;
        draft.applyGroupDone = true;
        break;
      case APPLY_GROUP_FAILURE:
        draft.applyGroupLoading = false;
        draft.applyGroupError = action.error;
        break;
      //가입신청 불러오기
      case LOAD_JOIN_REQUESTS_REQUEST:
        draft.loadJoinRequestsLoading = true;
        draft.loadJoinRequestsDone = false;
        draft.loadJoinRequestsError = null;  
        break;
      case LOAD_JOIN_REQUESTS_SUCCESS:
        draft.loadJoinRequestsLoading = false;
        draft.joinRequests = action.data;
        draft.loadJoinRequestsDone=true;
        break;
      case LOAD_JOIN_REQUESTS_FAILURE:
        draft.loadJoinRequestsLoading = false;
        draft.loadJoinRequestsError = action.error;
        break;

      //가입 승인
      case APPROVE_JOIN_REQUEST:
        draft.approveJoinRequestLoading =true;
        draft.approveJoinRequestDone = false;
        draft.approveJoinRequestError = null;       
        break;
      case APPROVE_JOIN_SUCCESS:
        draft.approveJoinRequestLoading =false;
        draft.joinRequests = draft.joinRequests.filter((r) => r.id !== action.data);
        draft.approveJoinRequestDone = true;
        break;
      case APPROVE_JOIN_FAILURE:
        draft.approveJoinRequestLoading =false;        
        draft.approveJoinRequestError = action.error;        
        break;
      //가입 거절
      case REJECT_JOIN_REQUEST:
        draft.rejectJoinRequestLoading =true;
        draft.rejectJoinRequestDone =false;
        draft.rejectJoinRequestError = null;
        break;
      case REJECT_JOIN_SUCCESS:
        draft.rejectJoinRequestLoading =false;
        draft.joinRequests = draft.joinRequests.filter((r) => r.id !== action.data);
        draft.rejectJoinRequestDone =true;
        break;
      case REJECT_JOIN_FAILURE:
        draft.rejectJoinRequestLoading =false;
        draft.rejectJoinRequestError = action.error;
        break;
//--------------------------------------------------------------------------------//

      default:
        break;
    }
  });

export default reducer;