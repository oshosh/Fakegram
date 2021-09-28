import { createAction, handleActions } from 'redux-actions';

export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,

    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,

    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,

    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,

    savePostLoading: false, // 게시물 저장하기 활성화 시도중
    savePostDone: false,
    savePostError: null,

    unsavePostLoading: false, // 게시물 저장하기 활성화 취소 시도중
    unsavePostDone: false,
    unsavePostError: null,

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

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME' // 나의 게시물 추가
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME' // 나의 게시물 삭제

export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST' // 게시물 저장하기 활성화
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';

export const UNSAVE_POST_REQUEST = 'UNSAVE_POST_REQUEST' // 게시물 저장하기 활성화 취소
export const UNSAVE_POST_SUCCESS = 'UNSAVE_POST_SUCCESS';
export const UNSAVE_POST_FAILURE = 'UNSAVE_POST_FAILURE';

const dummyUser = (data) => ({
    ...data,
    nickname: 'osh',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: 'hso11' }, { nickname: 'hso22' }, { nickname: 'hso33' }],
    Followers: [{ nickname: 'osh1' }, { nickname: 'osh2' }, { nickname: 'osh3' }],
    SavePosts: [{ id: 3 }], // 다른 사람의 게시물 저장 일단 임시로..
})
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
                logInLoading: true,
                logInError: null,
                logInDone: false,
                // me: null // 데이터도 안보여줄라고 할떄
            }
        },
        [LOG_IN_SUCCESS]: (state, action) => {
            return {
                ...state,
                logInLoading: false,
                logInDone: true,
                me: dummyUser(action.data),
            }
        },
        [LOG_IN_FAILURE]: (state, action) => {
            return {
                ...state,
                logInLoading: false,
                logInDone: false,
                logInError: action.error
            }
        },

        // 로그아웃
        [LOG_OUT_REQUEST]: (state, action) => {
            return {
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: null
            }
        },
        [LOG_OUT_SUCCESS]: (state, action) => {
            return {
                ...state,
                logOutLoading: false,
                logOutDone: true,
                me: null
            }
        },
        [LOG_OUT_FAILURE]: (state, action) => {
            return {
                ...state,
                logOutLoading: false,
                logOutError: action.error
            }
        },

        // 회원가입
        [SIGN_UP_REQUEST]: (state, action) => {
            return {
                ...state,
                signUpLoading: true,
                signUpDone: false,
                signUpError: null
            }
        },
        [SIGN_UP_SUCCESS]: (state, action) => {
            return {
                ...state,
                signUpLoading: false,
                signUpDone: true,
                me: null
            }
        },
        [SIGN_UP_FAILURE]: (state, action) => {
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.error
            }
        },

        // 닉네임 변경
        [CHANGE_NICKNAME_REQUEST]: (state, action) => {
            return {
                ...state,
                changeNicknameLoading: true,
                changeNicknameDone: false,
                changeNicknameError: null
            }
        },
        [CHANGE_NICKNAME_SUCCESS]: (state, action) => {
            return {
                ...state,
                changeNicknameLoading: false,
                changeNicknameDone: true,
                me: null
            }
        },
        [CHANGE_NICKNAME_FAILURE]: (state, action) => {
            return {
                ...state,
                changeNicknameLoading: false,
                changeNicknameError: action.error
            }
        },

        //게시물 저장하기 활성화
        [SAVE_POST_REQUEST]: (state, action) => {
            return {
                ...state,
                savePostLoading: true,
                savePostDone: false,
                savePostError: null
            }
        },
        [SAVE_POST_SUCCESS]: (state, action) => {
            return {
                ...state,
                me: {
                    ...state.me,
                    SavePosts: [{ id: action.data }, ...state.me.SavePosts],
                },
                savePostLoading: false,
                savePostDone: true,
            }
        },
        [SAVE_POST_FAILURE]: (state, action) => {
            return {
                ...state,
                savePostLoading: false,
                savePostError: action.error
            }
        },

        //게시물 저장하기 활성화 취소
        [UNSAVE_POST_REQUEST]: (state, action) => {
            return {
                ...state,
                unsavePostLoading: true,
                unsavePostDone: false,
                unsavePostError: null
            }
        },
        [UNSAVE_POST_SUCCESS]: (state, action) => {
            let filterData = state.me.SavePosts.filter((v) => v.id !== action.data)
            debugger
            return {
                ...state,
                me: {
                    ...state.me,
                    SavePosts: filterData,
                },
                unsavePostLoading: false,
                unsavePostDone: true,
            }
        },
        [UNSAVE_POST_FAILURE]: (state, action) => {
            return {
                ...state,
                unsavePostLoading: false,
                unsavePostError: action.error
            }
        },

        // 내가 게시물 추가 할 경우
        [ADD_POST_TO_ME]: (state, action) => {
            return {
                ...state,
                me: {
                    ...state.me,
                    Posts: [{ id: action.data }, ...state.me.Posts],
                }
            }
        }
    },
    initialState
)
export default reducer