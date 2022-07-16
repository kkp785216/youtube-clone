import { OFFLINE_HOME_VIDEOS_FAIL, OFFLINE_HOME_VIDEOS_REQUEST, OFFLINE_HOME_VIDEOS_SUCCESS } from "../ActionType";

export const homeVideosReducer = (state = {
    videos: [],
    moreDetails: [],
    channelDetails: [],
    loading: false.valueOf,
    nextPageToken: null,
    pageInfo: null,
    videoCategory: 'All'
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case OFFLINE_HOME_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: state.videoCategory === payload.category?[...state.videos, ...payload.videos] : payload.videos,
                moreDetails: state.videoCategory === payload.category?[...state.moreDetails, ...payload.moreDetails] : payload.moreDetails,
                channelDetails: state.videoCategory === payload.category?[...state.channelDetails, ...payload.channelDetails] : payload.channelDetails,
                nextPageToken: payload.nextPageToken,
                pageInfo: payload.pageInfo,
                videoCategory: payload.category,
                loading: false,
            }

        case OFFLINE_HOME_VIDEOS_FAIL:
            return {
                ...state,
                error: payload
            }

        case OFFLINE_HOME_VIDEOS_REQUEST:
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