import { useEffect } from 'react';
import { requestForToken, onMessageListener } from './firebase';

function App() {
  useEffect(() => {
    requestForToken();
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