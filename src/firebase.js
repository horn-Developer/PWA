import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBqjt4YqVdGMYbxr0OkTgC0FkRVRDPHfUw",
  authDomain: "my-app-8e194.firebaseapp.com",
  projectId: "my-app-8e194",
  storageBucket: "my-app-8e194.firebasestorage.app",
  messagingSenderId: "547411796892",
  appId: "1:547411796892:web:68d1a4a878a09bb7a4de59",
  measurementId: "G-ZWZYJ1X6ZB"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BFqPcWWp9BQ1st9yTDL3MR8fFDUZ6sKw38mVkg_rmcDJi3FCxl8MJSz0YKpbdo9usxByhxvz3tAxUzUAOQW5Cq8' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('FCM Token of User is ៖', currentToken);
       
      } else {
        console.log('cam not Token becase User can not  Permission។');
      }
    })
    .catch((err) => {
      console.log('proble catch Token៖ ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });