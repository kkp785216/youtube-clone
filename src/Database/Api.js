import axios from "axios";

let state = window.localStorage.getItem('selectApi') ? window.localStorage.getItem('selectApi') : "1";

export const apiKeys = [
    // kkp785216@gmail.com
    'AIzaSyCO43SCw8o4VrTC72M0wdgr8Sshov4-sZI',

    // technokp01@gmail.com
    'AIzaSyDswhVNGmIiRTRkKaCOZNoGIfFxPcRZPV8',
    'AIzaSyCLfmA48oc_KC8vqLXzWZ8WpfiUnRL9qdI',
    'AIzaSyDjBatH5f4ICUy8FmisCxR55M65e_XGCs0',
    'AIzaSyBIyNenyLHs0q0gLUOig9wyKq1kQjSxENg',
    'AIzaSyComQ5MCzrtaVfCC-lUJc75iCRgDg_9CEs',
    'AIzaSyCVGmu9VbTArKJSH76ZOlFYisEA5SAKgmk',
    'AIzaSyDA7Ig1144FvRVqF900IhjUIAfG_bQanzM',
    'AIzaSyCBeYmkY0_aOubJfl0oHSHOIsySJAEp88w',
    'AIzaSyCxvdpu0B-35FeQrRxSYRWLtIVg78kcJqA',
    'AIzaSyDUYr4y2nq6zoBrsn9Lw_rv5ujcDXz0gE0',
    'AIzaSyAzr-tuseNaxJI-Yy3-kccCN-nQnihoPiI',

    // kanhaiya277502@gmail.com
    'AIzaSyDo_0YDdRQ38vbVQ19Ng8bAHhRaNvyj_1s'
]
const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: {
        key: apiKeys[parseInt(state) - 1]
        // key: apiKeys[15]
    }
});

export default request;