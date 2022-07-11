import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./Reducers/auth.reducer";
import { homeVideosReducer } from "./Reducers/video.reducer";

const rootRdecer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer
});

const Store = createStore(
    rootRdecer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default Store;