import { SELECT_CATEGORY } from "../ActionType";

export const selectCategory = (title, id) => dispatch => {
    dispatch({
        type: SELECT_CATEGORY,
        payload: {id, title}
    });
}