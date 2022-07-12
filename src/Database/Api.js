import axios from "axios";

let state = window.localStorage.getItem('selectApi') ? window.localStorage.getItem('selectApi') : "1";

const apiKey = [
    process.env.REACT_APP_YT_API_KEY,
    'AIzaSyDswhVNGmIiRTRkKaCOZNoGIfFxPcRZPV8',
    'AIzaSyCLfmA48oc_KC8vqLXzWZ8WpfiUnRL9qdI',
    'AIzaSyDjBatH5f4ICUy8FmisCxR55M65e_XGCs0',
]
const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: {
        key: apiKey[parseInt(state) - 1]
    }
});

export default request;