import { ConfigProvider, type ThemeConfig, theme as antdTheme } from 'antd'
import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import DataProvider from './providers/DataProvider'
import EmotionThemeProvider from './providers/EmotionThemeProvider'
import MediaControlsProvider from './providers/MediaControlsProvider'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#09b36b',
    colorInfo: '#2b82b6',
    colorSuccess: '#86c626',
    colorWarning: '#eca31c',
    colorError: '#d94c62',
    borderRadius: 4,
  },
  algorithm: antdTheme.compactAlgorithm,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <EmotionThemeProvider>
        <DataProvider>
          <MediaControlsProvider>
            <App />
          </MediaControlsProvider>
        </DataProvider>
      </EmotionThemeProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
