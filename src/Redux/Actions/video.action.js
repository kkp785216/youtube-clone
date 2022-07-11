import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from "../ActionType"
import request from "../../Database/Api"

// export const getPopularVideos = () => async dispatch => {
//     try {
//         dispatch({
//             type: HOME_VIDEOS_REQUEST
//         });
//         const res = await request("/videos", {
//             params:{
//                 part: "snippet,contentDetails,statistics",
//                 chart: "mostPopular",
//                 regionCode: "IN",
//                 maxResults: 20,
//                 pageToken: "",
//             }
//         });

//         dispatch({
//             type: HOME_VIDEOS_SUCCESS,
//             payload: {
//                 videos: res.data.items,
//                 nextPageToken: res.data.nextPageToken,
//                 pageInfo: res.data.pageInfo,
//                 category: 'All'
//             }
//         })

//         console.log(res)
//     } catch (error) {
//         console.log(error);
//         dispatch({
//             type: HOME_VIDEOS_FAIL,
//             payload: error.message
//         });
//     }
// }

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST
        });
        const res = await request("/search", {
            params:{
                part: "snippet",
                q: keyword === 'All' ? '' : keyword,
                type: 'video',
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
            }
        });

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: res.data.items,
                nextPageToken: res.data.nextPageToken,
                pageInfo: res.data.pageInfo,
                category: keyword
            }
        })

        console.log(res)
    } catch (error) {
        console.log(error);
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        });
    }
}