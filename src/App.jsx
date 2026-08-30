import { useEffect } from 'react';
import { requestForToken, onMessageListener } from './firebase';

function App() {
  useEffect(() => {
    requestForToken().then((token) => {
      if (token) {
        console.log("FCM Token (Laptop): ", token);
        alert("Token របស់អ្នកគឺ៖ " + token); // เด้งបង្ហាញលើទូរសព្ទដើម្បី Copy
      }
    });

    onMessageListener()
      .then((payload) => { 
        alert(`ទទួលបានសារថ្មី៖ \n${payload.notification.title}\n${payload.notification.body}`);
        console.log("ទិន្នន័យសារ៖ ", payload);
      })
      .catch((err) => console.log('Error: ', err));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>សាកល្បង Push Notification ជាមួយ React + Vite</h1>
    </div>
  );
}

export default App;