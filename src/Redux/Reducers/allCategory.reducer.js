import { ALL_CATEGORY_SUCCESS, ALL_CATEGORY_FAIL, ALL_CATEGORY_REQUEST } from "../ActionType"

export const allCategoryReducer = (state = {
    allCategory: []
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                allCategory: payload.allCategory,
                loaded: true
            }

        case ALL_CATEGORY_FAIL:
            return {
                ...state,
                error: payload
            }

        case ALL_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }

        default:
            return {
                ...state
            }
    }
}