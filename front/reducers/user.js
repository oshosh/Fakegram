import { createAction, handleActions } from 'redux-actions';

export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {}
}

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';


export const loginAction = createAction(LOG_IN, data => data)
export const logoutAction = createAction(LOG_OUT)

const reducer = handleActions(
    {
        [LOG_IN]: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                me: action.payload,
            }
        },
        [LOG_OUT]: (state, action) => {
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }
        },
    },
    initialState
)
export default reducer