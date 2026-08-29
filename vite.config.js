import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // ធ្វើបច្ចុប្បន្នភាពកូដថ្មីដោយស្វ័យប្រវត្តិ
      includeAssets: [
        'favicon.ico',
         'apple-touch-icon.png', 
         'masked-icon.svg',
         'pwa-192x192.png', // បន្ថែមខ្សែបន្ទាត់នេះ
         'pwa-512x512.png'  // បន្ថែមខ្សែបន្ទាត់នេះ
      ],
      manifest: {
        name: 'កម្មវិធី React របស់ខ្ញុំ',
        short_name: 'ReactPWA',
        description: 'នេះជា App ដែលអាចដំឡើងលើទូរសព្ទបាន',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // បើកមកពេញអេក្រង់ដូច App ទូរសព្ទ
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // រក្សាទុកឯកសារទាំងអស់សម្រាប់បើក Offline
      }
    })
  ],
})
