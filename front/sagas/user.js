import { all, fork, delay, takeLatest, put } from "@redux-saga/core/effects"
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_IN_FAILURE, LOG_OUT_FAILURE } from "../reducers/user"
import axios from 'axios'

function logInAPI(data) {
    return axios.post('/api/login', data)
}

function* logIn(action) {
    try {
        // const result = yield call(logInAPI)
        yield delay(1000);
        console.log(action)
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.payload
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: LOG_IN_FAILURE,
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
        })
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut)
    ])
}