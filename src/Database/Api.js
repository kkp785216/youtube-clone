import axios from "axios";

let state = window.localStorage.getItem('selectApi') ? window.localStorage.getItem('selectApi') : "1";

export const apiKeys = [
    // kkp785216@gmail.com
    'AIzaSyCO43SCw8o4VrTC72M0wdgr8Sshov4-sZI',

    // kanhaiya277502@gmail.com
    'AIzaSyDo_0YDdRQ38vbVQ19Ng8bAHhRaNvyj_1s',
    'AIzaSyAblinAxL4_M8EW2EZdeFVyiNV238ioFAY',
    'AIzaSyDNZBDmYooRfOzZI31DvFh2GGrcoxuWNXw',
    'AIzaSyDeEu_SyZRpCY52pZv5AMkNLVMSl-BY5pE',
    'AIzaSyBM75GfcrEbkNqXDHJ99TtVwqtwMp9R62s',
    'AIzaSyDNNC7tbd8qj0oXl2Qzo3SJpWFXCyuiznc',
    'AIzaSyAMdROKeeHU7tf4tRN-IU8Sl5HLowoQgf4',
    'AIzaSyC0u6BRsbIZt3Y-A1L1pFVpulI4jxx7TCs',
]
const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    headers: {},
    params: {
        key: apiKeys[parseInt(state) - 1]
        // key: apiKeys[25]
    }
});

export const searchreq = axios.create({
    baseURL: "https://youtube-clone-backend.vercel.app",
    headers: {},
    params: {}
});

export default request;