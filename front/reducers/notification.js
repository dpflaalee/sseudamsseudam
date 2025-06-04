import shortId from 'shortid';  //##
import produce from 'immer';
import { faker } from '@faker-js/faker';
faker.seed(123);

///////////////////////////////////////////////////////////////////////
export const LOAD_NOTIFICATION_REQUEST = 'LOAD_NOTIFICATION_REQUEST';
export const LOAD_NOTIFICATION_SUCCESS = 'LOAD_NOTIFICATION_SUCCESS';
export const LOAD_NOTIFICATION_FAILURE = 'LOAD_NOTIFICATION_FAILURE';

export const ADD_NOTIFICATION_REQUEST = 'ADD_NOTIFICATION_REQUEST';
export const ADD_NOTIFICATION_SUCCESS = 'ADD_NOTIFICATION_SUCCESS';
export const ADD_NOTIFICATION_FAILURE = 'ADD_NOTIFICATION_FAILURE';

export const REMOVE_NOTIFICATION_REQUEST = 'REMOVE_NOTIFICATION_REQUEST';
export const REMOVE_NOTIFICATION_SUCCESS = 'REMOVE_NOTIFICATION_SUCCESS';
export const REMOVE_NOTIFICATION_FAILURE = 'REMOVE_NOTIFICATION_FAILURE';
///////////////////////////////////////////////////////////////////////

export const initialState = {
    loadNotificaionLoading: false,
    loadNotificaionDone: false,
    loadNotificaionError: null,

    addNotificaionLoading: false,
    addNotificaionDone: false,
    addNotificaionError: null,

    removeNotificaionLoading: false,
    removeNotificaionDone: false,
    removeNotificaionError: null,

    mainNotificaion: [],
};

//////////////////////////////////////////

const reducer = (state = initialState, action) => produce(state, (draft) => {
    console.log('🐬 Notificaion reducer');
    console.log('🐬 Notificaion reducer : type', action.type);
    console.log('🐬 Notificaion reducer : data', action.data);
    switch (action.type) {
        //////////////////////////////
        case LOAD_NOTIFICATION_REQUEST:
            draft.loadNotificaionLoading = true;
            draft.loadNotificaionDone = false;
            draft.loadNotificaionError = null;
            break;

        case LOAD_NOTIFICATION_SUCCESS:
            draft.loadNotificaionLoading = false;
            draft.loadNotificaionDone = true;
            draft.loadNotificaionError = null;
            draft.mainNotificaion = action.data;
            break;

        case LOAD_NOTIFICATION_FAILURE:
            draft.loadNotificaionLoading = false;
            draft.loadNotificaionDone = true;
            draft.loadNotificaionError = action.error;
            break;

        ///////////////////////////////////////
        case ADD_NOTIFICATION_REQUEST:
            draft.addNotificaionLoading = true;
            draft.addNotificaionDone = false;
            draft.addNotificaionError = null;
            break;

        case ADD_NOTIFICATION_SUCCESS:
            console.log('🐢 ADD_COMPLAIN_SUCCESS : ', action.data);
            const newNotificaton = action.data;
            draft.addNotificaionLoading = false;
            draft.addNotificaionDone = true;
            draft.addNotificaionError = null;
            draft.mainNotificaion = [newNotificaton, ...draft.mainNotificaion];
            console.log('🐢 draft.mainComplainCard : ', draft.mainNotificaion);
            break;

        case ADD_NOTIFICATION_FAILURE:
            draft.addNotificaionLoading = false;
            draft.addNotificaionDone = false;
            draft.addNotificaionError = action.error;
            console.log('🐢 ADD_NOTIFICATION_FAILURE : ', action.error);
            break;

        ////////////////////////////////////////
        case REMOVE_NOTIFICATION_REQUEST:
            draft.removeNotificaionLoading = true;
            draft.removeNotificaionDone = false;
            draft.removeNotificaionError = null;
            break;

        case REMOVE_NOTIFICATION_SUCCESS:
            draft.removeNotificaionLoading = false;
            draft.removeNotificaionDone = true;
            draft.removeNotificaionError = null;
            break;

        case REMOVE_NOTIFICATION_FAILURE:
            draft.removeNotificaionLoading = false;
            draft.removeNotificaionDone = false;
            draft.removeNotificaionError = action.error;
            break;

        ////////////////////////////////////////
        default:
            break;
    }
});

export default reducer;
