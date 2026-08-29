// public/firebase-messaging-sw.js
importScripts('https://gstatic.com');
importScripts('https://gstatic.com');

// ដាក់ Firebase Config របស់បងដូចក្នុង App.jsx ដែរ
const firebaseConfig = {
  apiKey: "AIzaSyBqjt4YqVdGMYbxr0OkTgC0FkRVRDPHfUw",
  authDomain: "://firebaseapp.com",
  projectId: "my-app-8e194",
  storageBucket: "my-app-8e194.firebasestorage.app",
  messagingSenderId: "547411796892",
  appId: "1:547411796892:web:68d1a4a878a09bb7a4de59",
  measurementId: "G-ZWZYJ1X6ZB"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// កូដសម្រាប់បង្ហាញសារដំណឹងពេលបិទ App (Background)
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/pwa-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
