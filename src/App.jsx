// src/App.jsx
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// 1. បោះ Firebase Config របស់បងចូលរួចរាល់
const firebaseConfig = {
  apiKey: "AIzaSyBqjt4YqVdGMYbxr0OkTgC0FkRVRDPHfUw",
  authDomain: "://firebaseapp.com",
  projectId: "my-app-8e194",
  storageBucket: "my-app-8e194.firebasestorage.app",
  messagingSenderId: "547411796892",
  appId: "1:547411796892:web:68d1a4a878a09bb7a4de59",
  measurementId: "G-ZWZYJ1X6ZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function App() {
  const [permission, setPermission] = useState(Notification.permission);
  const [deviceToken, setDeviceToken] = useState('');

  // 2. មុខងារសម្រាប់សុំច្បាប់ និងភ្ជាប់ទៅ Firebase
  const setupPushNotification = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.ready;
          
          // លោតសារតេស្តក្នុងម៉ាស៊ីនភ្លាមៗ
          reg.showNotification('សាកល្បងជោគជ័យ! 🎉', {
            body: 'បងបានបើកច្បាប់ទទួលសារដំណឹងរួចរាល់ហើយ!',
            icon: '/pwa-192x192.png',
            badge: '/pwa-192x192.png',
          });

          // ទាញយក Device Token ដោយប្រើ VAPID Key របស់បង
          const currentToken = await getToken(messaging, {
            serviceWorkerRegistration: reg,
            vapidKey: 'BFqPcWWp9BQ1st9yTDL3MR8fFDUZ6sKw38mVkg_rmcDJi3FCxl8MJSz0YKpbdo9usxByhxvz3tAxUzUAOQW5Cq8' 
          });

          if (currentToken) {
            console.log('Device Token របស់បងគឺ៖', currentToken);
            setDeviceToken(currentToken);
          } else {
            console.log('មិនអាចទាញយក Token បានទេ!');
          }
        }
      } else {
        alert('បងបានបដិសេធ (Block) ការផ្ញើសារដំណឹង!');
      }
    } catch (error) {
      console.error('មានបញ្ហាក្នុងការរៀបចំ Notification:', error);
    }
  };

  // 3. ចាប់ស្តាប់សារពេលកំពុងបើក App មើល (Foreground)
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('ទទួលបានសារថ្មីពេលកំពុងបើក App:', payload);
      alert(`🔔 ${payload.notification.title}\n${payload.notification.body}`);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>កម្មវិធី React + PWA + Firebase Push 🚀</h1>
      <p>App នេះអាចដំឡើងលើទូរសព្ទ និងអាចទទួលសារដំណឹងពីចម្ងាយបាន។</p>

      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', display: 'inline-block' }}>
        <p>ស្ថានភាពសារដំណឹង៖ <strong>{permission === 'granted' ? 'បានបើកហើយ ✅' : 'មិនទាន់បើកទេ ❌'}</strong></p>
        
        <button 
          onClick={setupPushNotification} 
          style={{ padding: '12px 24px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🔔 សាកល្បងចុចលោតសារដំណឹង & ភ្ជាប់ Firebase
        </button>
      </div>

      {deviceToken && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '5px', wordBreak: 'break-all' }}>
          <p style={{ color: 'green', fontWeight: 'bold' }}>ភ្ជាប់ជាមួយ Firebase រួចរាល់! លេខ Token របស់អ្នកគឺ៖</p>
          <code>{deviceToken}</code>
        </div>
      )}
    </div>
  );
}

export default App;
