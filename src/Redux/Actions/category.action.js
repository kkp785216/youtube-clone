import { SELECT_CATEGORY } from "../ActionType";

export const selectCategory = (value) => dispatch => {
    dispatch({
        type: SELECT_CATEGORY,
        payload: value
    });
}