import { createAction, handleActions } from 'redux-actions';
import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,   // main load 창에서 posts를 가져올지 말지 판단함

  loadPostsLoading: false, // 인피니트 스크롤에서 10개씩 불러옴
  loadPostsDone: false,
  loadPostsError: null,

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

const randomArr = [1, 2, 3, 4, 5, 6,]

export const generateDummyPost = (number) => Array(number).fill().map((item, idx) => {
  return {
    id: (idx + 1) + shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName()
    },
    content: faker.lorem.paragraphs(3, '\n'),
    Images: Array(
      Math.floor(Math.random() * randomArr.length) === 0
        ? 1
        : Math.floor(Math.random() * randomArr.length)
    ).fill().map(() => ({
      id: shortId.generate(),
      src: faker.image.image(),
    })),
    Comments: commentDummy
  }
})

const commentDummy = Array(40).fill().map((item, idx) => {
  return {
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName()
    },
    content: faker.lorem.sentence(),
    id: shortId.generate(),
  }
})

// 액션 함수
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = createAction(ADD_POST_REQUEST, (data) => data);
export const addComment = createAction(ADD_COMMENT_REQUEST, (data) => data);

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'osh',
  },
  Images: [
    {
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    },
  ],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'osh',
  },
});

const reducer = handleActions(
  {
    // 인피니트 스크롤에서 10개씩 불러옴
    [LOAD_POSTS_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
      }),
    [LOAD_POSTS_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data)
        draft.hasMorePosts = draft.mainPosts.length < 50;
      }),
    [LOAD_POSTS_FAILURE]: (state, action) => {
      produce(state, (draft) => {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
      });
    },

    // 포스트 추가
    [ADD_POST_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
      }),
    [ADD_POST_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const addPost = dummyPost(action.data)
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(addPost);
      }),
    [ADD_POST_FAILURE]: (state, action) => {
      produce(state, (draft) => {
        draft.addPostLoading = false;
        draft.addPostError = action.error;
      });
    },

    // 포스트 삭제
    [REMOVE_POST_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.removeLoading = true;
        draft.removeDone = false;
        draft.removeError = null;
      }),
    [REMOVE_POST_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        draft.removeLoading = false;
        draft.removeDone = true;
      }),
    [REMOVE_POST_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.removeLoading = false;
        draft.removeError = action.error;
      }),

    // 코멘트 추가
    [ADD_COMMENT_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
      }),
    [ADD_COMMENT_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const post = draft.mainPosts.find((v) => {
          return v.id === action.data.postId;
        });
        post.Comments.push(dummyComment(action.data.content)); //immer로 인한 원본 배열에 변화를 주지 않기떄문에 concat 대신 push
        draft.addPostLoading = false;
        draft.addCommentDone = true;
      }),

    [ADD_COMMENT_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
      }),
  },
  initialState,
);
export default reducer;

// const postIndex = state.mainPosts.findIndex(
//   (v) => v.id === action.data.postId,
// ); // 현재 포스트 id 조회
// const post = { ...state.mainPosts[postIndex] }; // 포스트 복사
// // post.Comments = [dummyComment(action.data.content), ...post.Comments]
// post.Comments = [...post.Comments, dummyComment(action.data.content)]; // 복사된 post의 comments에 기존 코멘트와 넘겨준 코멘트를 합침

// const mainPosts = [...state.mainPosts];
// mainPosts[postIndex] = post; // mainposts에 기존 포스트를 덮어침







// mainPosts: [
//   {
//     id: 1,
//     User: {
//       id: 1,
//       nickname: 'osh',
//     },
//     content:
//       '첫 번째 게시글 ##해쉬태그 테스트 굿\n첫 번째 게시글 ##해쉬태그 테스트 굿\n첫 번째 게시글 ##해쉬태그 테스트 굿\n첫 번째 게시글 ##해쉬태그 테스트 굿',
//     // content: 'hiasdkjf sadfjka;sdja asd;fjkla;sldkfffff',
//     Images: [
//       {
//         id: shortId.generate(),
//         src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/152229/slider-img-1.jpg',
//       },
//       {
//         id: shortId.generate(),
//         src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
//       },
//       {
//         id: shortId.generate(),
//         src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
//       },
//     ],
//     Comments: [
//       {
//         User: {
//           id: shortId.generate(),
//           nickname: '1',
//         },
//         content: '1',
//         id: 1,
//       },
//       {
//         User: {
//           id: shortId.generate(),
//           nickname: '2',
//         },
//         content: '2',
//         id: 2,
//       },
//       {
//         User: {
//           id: shortId.generate(),
//           nickname: '3',
//         },
//         content: '3',
//         id: 3,
//       },
//       {
//         User: {
//           id: shortId.generate(),
//           nickname: '4',
//         },
//         content: '4',
//         id: 4,
//       },
//       {
//         User: {
//           id: shortId.generate(),
//           nickname: '5',
//         },
//         content: '5',
//         id: 5,
//       },
//       {
//         User: {
//           id: shortId.generate(),
//           nickname: '6',
//         },
//         content: '6',
//         id: 6,
//       },
//       {
//         User: {
//           id: shortId.generate(),
//           nickname: '7',
//         },
//         content: '7',
//         id: 7,
//       },
//       {
//         User: {
//           id: shortId.generate(),
//           nickname: '8',
//         },
//         content: '8',
//         id: 8,
//       },
//     ],
//   },
// ],