import { useState, useEffect } from 'react';
import { requestForToken, onMessageListener } from './firebase';

function App() {
  const [tokenText, setTokenText] = useState('កំពុងទាញយក Token...');

  useEffect(() => {
    requestForToken().then((token) => {
      if (token) {
       
        console.log("FCM Token គឺ៖", token);
        setTokenText(token);
      } else {
        setTokenText('រកមិនឃើញ Token (សូមពិនិត្យសិទ្ធិ Notification)');
      }
    });

    onMessageListener()
      .then((payload) => { 
        alert(`ទទួលបានសារថ្មី៖ \n${payload.notification.title}\n${payload.notification.body}`);
        console.log("ទិន្នន័យសារ៖ ", payload);
      })
      .catch((err) => console.log('Error: ', err));
  }, []);

  const copyToken = () => {
    navigator.clipboard.writeText(tokenText);
    alert('Copy Token រួចរាល់!');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
      <h1>សាកល្បង Push Notification</h1>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>FCM Token របស់អ្នក៖</p>
      <div style={{ 
        background: '#f1f1f1', 
        padding: '10px', 
        wordBreak: 'break-all', 
        fontSize: '12px', 
        maxHeight: '100px', 
        overflowY: 'auto',
        textAlign: 'left',
        border: '1px solid #ccc'
      }}>
        {tokenText}
      </div>
      <button 
        onClick={copyToken}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Copy Token
      </button>
    </div>
  );
}

export default App;