import { ConfigProvider, type ThemeConfig, theme as antdTheme } from 'antd'
import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import EmotionThemeProvider from './providers/EmotionThemeProvider.tsx'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#09b36b',
    colorInfo: '#2b82b6',
    colorSuccess: '#86c626',
    colorWarning: '#eca31c',
    colorError: '#d94c62',
    borderRadius: 2,
    motion: false,
  },
  algorithm: antdTheme.compactAlgorithm,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <EmotionThemeProvider>
        <App />
      </EmotionThemeProvider>
    </ConfigProvider>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
