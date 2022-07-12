import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from "../ActionType";

export const homeVideosReducer = (state = {
    videos: [],
    loading: false.valueOf,
    nextPageToken: null,
    pageInfo: null,
    activeCategory: 'All'
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case HOME_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: state.activeCategory === payload.category?[...state.videos, ...payload.videos] : payload.videos,
                nextPageToken: payload.nextPageToken,
                pageInfo: payload.pageInfo,
                activeCategory: payload.category,
                loading: false
            }

        case HOME_VIDEOS_FAIL:
            return {
                ...state,
                error: payload
            }

        case HOME_VIDEOS_REQUEST:
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