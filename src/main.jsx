// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// ចុះឈ្មោះ Service Worker របស់ PWA ដោយប្រើកូដ Browser ផ្ទាល់
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js') // sw.js នឹងត្រូវបង្កើតដោយ Vite PWA ពេល build
      .then(reg => console.log('PWA Service Worker បានចុះឈ្មោះជោគជ័យ៖', reg.scope))
      .catch(err => console.log('ការចុះឈ្មោះ PWA បរាជ័យ៖', err))
  })
}
