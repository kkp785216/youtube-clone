import { SEARCH_VIDEOS_FAIL, SEARCH_VIDEOS_REQUEST, SEARCH_VIDEOS_SUCCESS } from "../ActionType";

export const searchVideosReducer = (state = {
    videos: [],
    moreDetails: [],
    channelDetails: [],
    loading: false.valueOf,
    nextPage: null,
    pageInfo: null,
    videoCategory: 'All'
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case SEARCH_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: state.videoCategory === payload.category?[...state.videos, ...payload.videos] : payload.videos,
                moreDetails: state.videoCategory === payload.category?[...state.moreDetails, ...payload.moreDetails] : payload.moreDetails,
                channelDetails: state.videoCategory === payload.category?[...state.channelDetails, ...payload.channelDetails] : payload.channelDetails,
                nextPage: payload.nextPage,
                pageInfo: payload.pageInfo,
                videoCategory: payload.category,
                loading: false,
            }

        case SEARCH_VIDEOS_FAIL:
            return {
                ...state,
                error: payload
            }

        case SEARCH_VIDEOS_REQUEST:
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