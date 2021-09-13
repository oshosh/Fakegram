import { createAction, handleActions } from 'redux-actions';

export const initialState = {
    isLoggedIn: false,
    user: null,
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
                user: action.data,
            }
        },
        [LOG_OUT]: (state, action) => {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        },
    },
    initialState
)
export default reducer