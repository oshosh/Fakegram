import { createAction, handleActions } from "redux-actions"

export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: 'osh',
            },
            content: '첫 번째 게시글',
            Images: [{
                src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
            }, {
                src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
            }, {
                src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
            }],
            Comments: [{
                User: {
                    nickname: '1',
                },
                content: '첫 댓글입니다 ㅋ',
            }, {
                User: {
                    nickname: '2',
                },
                content: '하염ㅋ',
            },
            {
                User: {
                    nickname: '3',
                },
                content: '하염ㅋ',
            }, {
                User: {
                    nickname: '4',
                },
                content: '하염ㅋ',
            },
                // {
                //     User: {
                //         nickname: '5',
                //     },
                //     content: '하염ㅋ',
                // }, {
                //     User: {
                //         nickname: '6',
                //     },
                //     content: '하염ㅋ',
                // }, {
                //     User: {
                //         nickname: '7',
                //     },
                //     content: '하염ㅋ',
                // }, {
                //     User: {
                //         nickname: '8',
                //     },
                //     content: '하염ㅋ',
                // }, {
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
    postAdded: false,
};

const dummyPost = {
    id: 2,
    content: '더미 포스트',
    User: {
        id: 1,
        nickname: 'osh',
    },
    Images: [],
    Comments: [],
};

const ADD_POST = "ADD_POST";

export const addPost = createAction(ADD_POST)

const reducer = handleActions(
    {
        [ADD_POST]: (state, action) => {
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            }
        }
    },
    initialState
)
export default reducer