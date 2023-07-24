import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDIqprQNELpnLfXIRF8niUA8WJArdF1i1E",
    authDomain: "salespitchapp-1744a.firebaseapp.com",
    projectId: "salespitchapp-1744a",
    storageBucket: "salespitchapp-1744a.appspot.com",
    messagingSenderId: "1071019670975",
    appId: "1:411803660810:android:3dc70f09ee9604bcf825f3"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
