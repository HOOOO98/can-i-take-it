import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDhVRmRZDgYAkyg6IOluv38d6HFKtDf1nI",
  authDomain: "canitakeit-77341.firebaseapp.com",
  projectId: "canitakeit-77341",
  storageBucket: "canitakeit-77341.appspot.com",
  messagingSenderId: "392489691417",
  appId: "1:392489691417:web:07f2e8c34c01fbdbd0bd88",
  measurementId: "G-3W69K0G1ND",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
