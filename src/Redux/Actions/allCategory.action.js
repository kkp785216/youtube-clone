import { ALL_CATEGORY_SUCCESS, ALL_CATEGORY_FAIL, ALL_CATEGORY_REQUEST } from "../ActionType"
import request from "../../Database/Api"

export const allCategoryAction = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_CATEGORY_REQUEST
        });
        const res = await request("/videoCategories", {
            params: {
                part: "snippet",
                regionCode: 'IN',
            }
        });
        let music = res.data.items.find(a=>a.snippet.title === 'Music');
        res.data.items.unshift({id: music.id ? music.id : 10, snippet:{title: "All"}});

        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: {
                allCategory : res.data.items.map(a=>{ return {id: a.id, title: a.snippet.title}})
            }
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.message
        });
    }
}