import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../ActionType"

const initialState = {
    accessToken: window.localStorage.getItem('ytc_access_token') ? window.localStorage.getItem('ytc_access_token') : null,
    user: window.localStorage.getItem('ytc_user') ? JSON.parse(window.localStorage.getItem('ytc_user')) : null,
    loading: window.localStorage.getItem('ytc_loading') ? window.localStorage.getItem('ytc_loading') : null,
}

export const authReducer = (prevState = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...prevState,
                loading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...prevState,
                accessToken: payload,
                loading: false
            }
        case LOGIN_FAIL:
            return {
                ...prevState,
                accessToken: null,
                loading: false,
                error: payload
            }
        case LOAD_PROFILE:
            return {
                ...prevState,
                user: payload,
            }
        case LOG_OUT:
            return {
                ...prevState,
                accessToken: null,
                user: null,
            }
        default:
            return prevState;
    }
}