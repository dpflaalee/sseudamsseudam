import axios from 'axios';
import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
    LOAD_CATEGORIES_REQUEST,
    LOAD_CATEGORIES_SUCCESS,
    LOAD_CATEGORIES_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    EDIT_CATEGORY_REQUEST,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_FAILURE,
} from '../reducers/category';

// 카테고리 목록 로드 API
function loadCategoriesAPI() {
    return axios.get('/category');
}

// 카테고리 목록 로드 작업 (saga)
function* loadCategories() {
    try {
        const result = yield call(loadCategoriesAPI);
        yield put({
            type: LOAD_CATEGORIES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_CATEGORIES_FAILURE,
            error: err.response?.data || err.message,
        });
    }
}

// 카테고리 추가 API
function addCategoryAPI(data) {
    return axios.post('/category', data);
}

// 카테고리 추가 작업 (saga)
function* addCategory(action) {
    try {
        const result = yield call(addCategoryAPI, action.data);
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            data: result.data.category,
        });
    } catch (err) {
        yield put({
            type: ADD_CATEGORY_FAILURE,
            error: err.response?.data || err.message,
        });
    }
}

// 카테고리 수정 API (PATCH 요청)
function editCategoryAPI(data) {
    console.log('👻 editCategoryAPI : ', data);
    return axios.patch(`/category/${data.id}`, data);
}

// 카테고리 수정 작업 (saga)
function* editCategory(action) {
    console.log('👻 editCategory : ', action.data);
    try {
        const result = yield call(editCategoryAPI, action.data);
        yield put({
            type: EDIT_CATEGORY_SUCCESS,
            data: result.data.category,
        });
    } catch (err) {
        yield put({
            type: EDIT_CATEGORY_FAILURE,
            error: err.response?.data || err.message,
        });
    }
}

// 카테고리 목록 로드 watcher
function* watchLoadCategories() {
    yield takeLatest(LOAD_CATEGORIES_REQUEST, loadCategories);
}

// 카테고리 추가 watcher
function* watchAddCategory() {
    yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

// 카테고리 수정 watcher
function* watchEditCategory() {
    yield takeLatest(EDIT_CATEGORY_REQUEST, editCategory);
}

// 모든 사가를 묶어서 export
export default function* categorySaga() {
    yield all([
        fork(watchLoadCategories),
        fork(watchAddCategory),
        fork(watchEditCategory),
    ]);
}