import { createAction, handleActions } from "redux-actions"

export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: 'osh',
            },
            content: '첫 번째 게시글 ##해쉬태그 테스트 굿\n첫 번째 게시글 ##해쉬태그 테스트 굿\n첫 번째 게시글 ##해쉬태그 테스트 굿\n첫 번째 게시글 ##해쉬태그 테스트 굿',
            // content: 'hiasdkjf sadfjka;sdja asd;fjkla;sldkfffff',
            Images: [{
                src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/152229/slider-img-1.jpg',
            }, {
                src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
            }, {
                src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
            }],
            Comments: [
                //     {
                //     User: {
                //         nickname: '1',
                //     },
                //     content: '1',
                //     id: 1,
                // }, {
                //     User: {
                //         nickname: '2',
                //     },
                //     content: '2',
                //     id: 2,
                // },
                // {
                //     User: {
                //         nickname: '3',
                //     },
                //     content: '3',
                //     id: 3,
                // }, {
                //     User: {
                //         nickname: '4',
                //     },
                //     content: '4',
                //     id: 4,
                // },
                // {
                //     User: {
                //         nickname: '5',
                //     },
                //     content: '5',
                //     id: 5,
                // }, {
                //     User: {
                //         nickname: '6',
                //     },
                //     content: '6',
                //     id: 6,
                // }, {
                //     User: {
                //         nickname: '7',
                //     },
                //     content: '7',
                //     id: 7,
                // }, {
                //     User: {
                //         nickname: '8',
                //     },
                //     content: '8',
                //     id: 8,
                // }
                //, {
                //     User: {
                //         nickname: '9',
                //     },
                //     content: '하염ㅋ',
                // }, {
                //     User: {
                //         nickname: 'hso',
                //     },
                //     content: '하염ㅋ',
                // }, {
                //     User: {
                //         nickname: 'hso',
                //     },
                //     content: '하염ㅋ',
                // }, {
                //     User: {
                //         nickname: 'hso',
                //     },
                //     content: '하염ㅋ',
                // }, {
                //     User: {
                //         nickname: 'hso',
                //     },
                //     content: '하염ㅋ',
                // }, {
                //     User: {
                //         nickname: 'hso',
                //     },
                //     content: '하염ㅋ',
                // }
            ]
        },
    ],
    imagePaths: [],

    addPostLoading: false, // 포스트 추가
    addPostDone: false,
    addPostError: null,

    addCommentLoading: false, // 댓글 달기
    addCommentDone: false,
    addCommentError: null,

    removePostLoading: false, // 포스트 삭제
    removePostDone: false,
    removePostError: null,
};

const dummyPost = {
    id: 2,
    content: '더미 포스트',
    User: {
        id: 1,
        nickname: 'osh',
    },
    Images: [{
        src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    },],
    Comments: [],
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = createAction(ADD_POST_REQUEST, (data) => data);
export const addComment = createAction(ADD_COMMENT_REQUEST, (data) => data);

const dummyComment = (data) => ({
    id: 9,
    content: data,
    User: {
        id: 1,
        nickname: 'osh',
    },
})

const reducer = handleActions(
    {
        // 포스트 추가
        [ADD_POST_REQUEST]: (state, action) => {
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        },
        [ADD_POST_SUCCESS]: (state, action) => {
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            }
        },
        [ADD_POST_FAILURE]: (state, action) => {
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        },

        // 코멘트 추가
        [ADD_COMMENT_REQUEST]: (state, action) => {
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }
        },
        [ADD_COMMENT_SUCCESS]: (state, action) => {

            const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId)

            const post = { ...state.mainPosts[postIndex] }
            // post.Comments = [dummyComment(action.data.content), ...post.Comments]
            post.Comments = [...post.Comments, dummyComment(action.data.content)]

            const mainPosts = [...state.mainPosts]
            mainPosts[postIndex] = post

            return {
                ...state,
                mainPosts,
                addPostLoading: false,
                addCommentDone: true,
            }
        },
        [ADD_COMMENT_FAILURE]: (state, action) => {
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }
        },
    },
    initialState
)
export default reducer