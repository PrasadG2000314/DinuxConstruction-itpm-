import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyCMUckLSFB-U4KWIPJqV3dTQdTJZgzbCPU",
    authDomain: "apex-2e1cc.firebaseapp.com",
    projectId: "apex-2e1cc",
    storageBucket: "apex-2e1cc.appspot.com",
    messagingSenderId: "38242081240",
    appId: "1:38242081240:web:5127c8d729bf254d533aad",
    measurementId: "G-ZX2XDDN830"
});



// Firebase storage reference
const storage = getStorage(app);
export default storage;