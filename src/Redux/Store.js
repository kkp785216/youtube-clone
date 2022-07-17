import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { apiReducer } from "./Reducers/api.reducer";
import { authReducer } from "./Reducers/auth.reducer";
import { categoryReducer } from "./Reducers/category.reducer";
import { homeVideosListReducer, homeVideosReducer } from "./Reducers/video.reducer";

const rootRdecer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer,
    homeVideosList: homeVideosListReducer,
    apiState: apiReducer,
    catgoryState: categoryReducer
});

const Store = createStore(
    rootRdecer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default Store;