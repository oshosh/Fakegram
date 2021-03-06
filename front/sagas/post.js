import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import shortid from 'shortid';

import {
    ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS,
    generateDummyPost,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS
} from "../reducers/post";

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(data) {
    return axios.get('/api/post', data);
}

// 게시물 추가하기
function* loadPosts(action) {
    try {
        // const result = yield call(loadPostsAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10)
        });

    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}

function addPostAPI(data) {
    return axios.post('/api/post', data);
}

// 게시물 추가하기
function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortid.generate()

        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.payload
            }
        });

        // 나의 게시물을 추가 할 경우
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}
//https://coffeeandcakeandnewjeong.tistory.com/52
function removePostAPI(data) {
    return axios.post('/api/post', data);
}
// 게시물 추가하기
function* removePost(action) {
    try {
        // const result = yield call(removePostAPI, action.data);
        yield delay(1000);
        // 게시물 삭제는 내 게시물도 삭제 된다...
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.id
        });

        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.id,
        });

    } catch (err) {
        console.log(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function addCommentAPI(data) {
    return axios.post(`/api/post/comment`, data);
}

function* addComment(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.payload,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}


function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}


function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}