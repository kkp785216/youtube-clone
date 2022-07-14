import { SELECT_CATEGORY } from "../ActionType";

export const categoryReducer = (activeCategory = { activeCategory: 'All' }, action) => {
    const { type, payload } = action;
    switch (type) {
        case SELECT_CATEGORY:
            return {
                ...activeCategory,
                activeCategory: payload
            }
        default:
            return {
                ...activeCategory,
            }
    }
}