import { SELECT_API } from "../ActionType";

export const selectApi = (value) => dispatch => {
    dispatch({
        type: SELECT_API,
        payload: value
    });
}