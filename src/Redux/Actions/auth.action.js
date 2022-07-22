import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../../Database/Firebase"
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../ActionType";

export const login = () => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube.readonly');

        const res = await signInWithPopup(auth, provider);

        const accessToken = res._tokenResponse.oauthAccessToken
        const profile = {
            name: res._tokenResponse.displayName,
            photoUrl: res._tokenResponse.photoUrl
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: accessToken
        });

        dispatch({
            type: LOAD_PROFILE,
            payload: profile
        });

        window.localStorage.setItem('ytc_access_token', accessToken);
        window.localStorage.setItem('ytc_user', JSON.stringify(profile));
        window.localStorage.setItem('ytc_loading', false);

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.message
        })
    }
}

export const logout = () => async dispatch => {
    await auth.signOut();
    dispatch({
        type: LOG_OUT
    })
    localStorage.removeItem('ytc_access_token');
    localStorage.removeItem('ytc_user');
    localStorage.removeItem('ytc_loading');
}