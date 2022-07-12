import { SELECT_API } from "../ActionType";

export const apiReducer = (apiState = { apiState: '1' }, action) => {
    const { type, payload } = action;
    switch (type) {
        case SELECT_API:
            return {
                ...apiState,
                apiState: payload
            }
        default:
            return {
                ...apiState,
            }
    }
}