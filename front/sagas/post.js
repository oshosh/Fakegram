import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import shortid from 'shortid';
import {
    ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS
} from "../reducers/post";
import { ADD_POST_TO_ME } from '../reducers/user';

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

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}