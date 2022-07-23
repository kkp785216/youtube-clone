import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { allCategoryReducer } from "./Reducers/allCategory.reducer";
import { apiReducer } from "./Reducers/api.reducer";
import { authReducer } from "./Reducers/auth.reducer";
import { categoryReducer } from "./Reducers/category.reducer";
import { searchVideosReducer } from "./Reducers/search.recuder";
import { homeVideosReducer } from "./Reducers/video.reducer";

const rootRdecer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer,
    apiState: apiReducer,
    catgoryState: categoryReducer,
    allCategory: allCategoryReducer,
    searchVideos: searchVideosReducer
});

const Store = createStore(
    rootRdecer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default Store;