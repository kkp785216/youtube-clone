import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from "../ActionType";

export const homeVideosListReducer = (state = {
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
        case HOME_VIDEOS_SUCCESS:
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
        case HOME_VIDEOS_SUCCESS:
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