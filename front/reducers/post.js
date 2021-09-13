import { handleActions } from "redux-actions"

export const initialState = {
    mainPosats: [],
}
const reducer = handleActions(
    {
        "": (state, action) => {
            return {

            }
        }
    },
    initialState
)
export default reducer