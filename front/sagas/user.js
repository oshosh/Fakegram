import { all, fork, delay, takeLatest, put } from "@redux-saga/core/effects"
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS, LOG_IN_FAILURE, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAILURE,
    UNSAVE_POST_REQUEST, UNSAVE_POST_FAILURE, UNSAVE_POST_SUCCESS,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
} from "../reducers/user"
import axios from 'axios'


function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
    try {
        // const result = yield call(followAPI, action.data);
        yield delay(1000);

        yield put({
            type: FOLLOW_SUCCESS,
            data: action.id,
        });
    } catch (err) {
        console.error(err)
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
    try {
        // const result = yield call(unfollowAPI, action.data);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.id,
        });
    } catch (err) {
        console.error(err)
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function logInAPI(data) {
    return axios.post('/api/login', data)
}

function* logIn(action) {
    try {
        // const result = yield call(logInAPI)
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.payload
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: LOG_IN_FAILURE,
            error: error.response.data,
        })
    }
}

function logOutAPI(data) {
    return axios.post('/api/logout', data)
}

function* logOut(action) {
    try {
        // const result = yield call(logOutAPI)
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: LOG_OUT_FAILURE,
            error: error.response.data,
        })
    }
}

function signUpAPI(data) {
    return axios.post('/api/signUp')
}

function* signUp(action) {
    try {
        // const result = yield call(signUpAPI)
        // throw new Error('')
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: SIGN_UP_FAILURE,
            error: error.response.data,
        })
    }
}

function* savePost(action) {
    try {

        yield delay(1000);
        yield put({
            type: SAVE_POST_SUCCESS,
            data: action.id,
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: SAVE_POST_FAILURE,
            error: error.response.data,
        })
    }
}

function* unSavePost(action) {
    try {

        yield delay(1000);
        yield put({
            type: UNSAVE_POST_SUCCESS,
            data: action.id,
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: UNSAVE_POST_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchSavePosts() {
    yield takeLatest(SAVE_POST_REQUEST, savePost)
}

function* watchUnSavePosts() {
    yield takeLatest(UNSAVE_POST_REQUEST, unSavePost)
}

export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchSavePosts),
        fork(watchUnSavePosts),
    ])
}