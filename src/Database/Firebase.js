import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyCO43SCw8o4VrTC72M0wdgr8Sshov4-sZI",
    authDomain: "clone-3ba8e.firebaseapp.com",
    projectId: "clone-3ba8e",
    storageBucket: "clone-3ba8e.appspot.com",
    messagingSenderId: "895195572079",
    appId: "1:895195572079:web:5b3e0e021a0af87b7baa9a"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  export default auth;