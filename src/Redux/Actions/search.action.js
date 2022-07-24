import { SEARCH_VIDEOS_FAIL, SEARCH_VIDEOS_REQUEST, SEARCH_VIDEOS_SUCCESS } from "../ActionType"
import request, { searchreq } from "../../Database/Api"

export const getVideosBySearch = (keyword, maxresult, isFirst) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEARCH_VIDEOS_REQUEST
        });

        const videoIdRes = await searchreq('', {
            method: 'GET',
            params: {
                q: keyword,
                maxResult: maxresult
            }
        });

        let arr = videoIdRes.data.items.map(a=>a.id).toString();
        
        const res = await request("/videos", {
            params: {
                part: "snippet,contentDetails,statistics",
                regionCode: 'IN',
                id: arr,
                maxResults: maxresult,
            }
        });

        const moreDetailsArr = [];
        const channelDetailsArr = [];
        res.data.items.forEach((videos) => {
            const moreDetailsPromice = async () => {
                return {
                    data: {items: [{contentDetails: videos.contentDetails, statistics: videos.statistics}]}
                }
            }
            moreDetailsArr.push(moreDetailsPromice());

            const get_channel_details = request("/channels", {
                params: {
                    part: 'snippet',
                    id: videos.snippet.channelId
                }
            });
            channelDetailsArr.push(get_channel_details);
        });

        dispatch({
            type: SEARCH_VIDEOS_SUCCESS,
            payload: {
                videos: res.data.items,
                nextPage: videoIdRes.data.nextPage,
                pageInfo: res.data.pageInfo,
                category: keyword,
                etag: res.data.etag,
                moreDetails: moreDetailsArr,
                channelDetails: channelDetailsArr,
                isFirst: isFirst
            }
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: SEARCH_VIDEOS_FAIL,
            payload: error.message
        });
    }
}


export const getVideosBySearchNext = (keyword, nextPage, maxresult, isFirst) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEARCH_VIDEOS_REQUEST
        });

        const videoIdRes = await searchreq('/next', {
            method: 'GET',
            params: {
                nextPage: nextPage,
                maxResult: maxresult
            }
        });

        let arr = videoIdRes.data.items.map(a=>a.id).toString();
        
        const res = await request("/videos", {
            params: {
                part: "snippet,contentDetails,statistics",
                regionCode: 'IN',
                id: arr,
                maxResults: maxresult,
            }
        });

        const moreDetailsArr = [];
        const channelDetailsArr = [];
        res.data.items.forEach((videos) => {
            const moreDetailsPromice = async () => {
                return {
                    data: {items: [{contentDetails: videos.contentDetails, statistics: videos.statistics}]}
                }
            }
            moreDetailsArr.push(moreDetailsPromice());

            const get_channel_details = request("/channels", {
                params: {
                    part: 'snippet',
                    id: videos.snippet.channelId
                }
            });
            channelDetailsArr.push(get_channel_details);
        });

        dispatch({
            type: SEARCH_VIDEOS_SUCCESS,
            payload: {
                videos: res.data.items,
                nextPage: videoIdRes.data.nextPage,
                pageInfo: res.data.pageInfo,
                category: keyword,
                etag: res.data.etag,
                moreDetails: moreDetailsArr,
                channelDetails: channelDetailsArr,
                isFirst: isFirst
            }
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: SEARCH_VIDEOS_FAIL,
            payload: error.message
        });
    }
}