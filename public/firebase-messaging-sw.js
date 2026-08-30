// នាំចូល Firebase Compat scripts សម្រាប់ Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBqjt4YqVdGMYbxr0OkTgC0FkRVRDPHfUw",
  authDomain: "my-app-8e194.firebaseapp.com",
  projectId: "my-app-8e194",
  storageBucket: "my-app-8e194.firebasestorage.app",
  messagingSenderId: "547411796892",
  appId: "1:547411796892:web:68d1a4a878a09bb7a4de59",
  measurementId: "G-ZWZYJ1X6ZB"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] recive message  ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'  
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});