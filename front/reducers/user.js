import { createAction, handleActions } from 'redux-actions';

export const initialState = {
    isLoggingIn: false, // 로그인 시도중
    isLoggedIn: false,

    isLoggingOut: false, // 로그아웃 시도중

    me: null,
    signUpData: {},
    loginData: {}
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

// 액션 함수
export const loginRequestAction = createAction(LOG_IN_REQUEST, data => {
    return data
})

export const logoutRequestAction = createAction(LOG_OUT_REQUEST)

const reducer = handleActions(
    {
        //로그인
        [LOG_IN_REQUEST]: (state, action) => {
            return {
                ...state,
                isLoggingIn: true,
            }
        },
        [LOG_IN_SUCCESS]: (state, action) => {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: { ...action.data, nickname: 'osh' },
            }
        },
        [LOG_IN_FAILURE]: (state, action) => {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
            }
        },
        // 로그아웃
        [LOG_OUT_REQUEST]: (state, action) => {
            return {
                ...state,
                isLoggingOut: true,
                me: null,
            }
        },
        [LOG_OUT_SUCCESS]: (state, action) => {
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null,
            }
        },
        [LOG_IN_FAILURE]: (state, action) => {
            return {
                ...state,
                isLoggingOut: false,
            }
        },
    },
    initialState
)
export default reducer