import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from "../ActionType"
import request from "../../Database/Api"

export const getVideosList = (keyword, maxresult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST
        });
        const res = await request("/videos", {
            params: {
                part: "snippet,contentDetails,statistics",
                chart: 'mostPopular',
                regionCode: 'IN',
                videoCategoryId: '2',
                maxResults: maxresult,
                pageToken: getState().homeVideos.nextPageToken,
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
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: res.data.items,
                nextPageToken: res.data.nextPageToken,
                pageInfo: res.data.pageInfo,
                category: keyword,
                etag: res.data.etag,
                moreDetails: moreDetailsArr,
                channelDetails: channelDetailsArr
            }
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        });
    }
}

export const getVideosByCategory = (keyword, maxresult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST
        });
        const res = await request("/search", {
            params: {
                part: "snippet",
                q: keyword === 'All' ? 'Popular Videos' : keyword,
                type: 'video',
                maxResults: maxresult,
                pageToken: getState().homeVideos.nextPageToken,
            }
        });

        const moreDetailsArr = [];
        const channelDetailsArr = [];
        res.data.items.forEach((videos) => {
            const get_video_details = request("/videos", {
                params: {
                    part: 'contentDetails,statistics',
                    id: videos.id.videoId
                }
            });
            moreDetailsArr.push(get_video_details);

            const get_channel_details = request("/channels", {
                params: {
                    part: 'snippet',
                    id: videos.snippet.channelId
                }
            });
            channelDetailsArr.push(get_channel_details);
        });

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: res.data.items,
                nextPageToken: res.data.nextPageToken,
                pageInfo: res.data.pageInfo,
                category: keyword,
                etag: res.data.etag,
                moreDetails: moreDetailsArr,
                channelDetails: channelDetailsArr
            }
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        });
    }
}