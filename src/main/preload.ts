import { contextBridge, ipcRenderer } from 'electron'

import type { Data } from '../types/data'

declare global {
  interface Window {
    [electronAPIKey]: typeof electronAPI
  }
}

const electronAPIKey = 'electronAPI'

const electronAPI = {
  /**
   *  Open file dialog
   */
  openFiles: ({ recursive }: { recursive: boolean }): Promise<Data[]> =>
    ipcRenderer.invoke('dialog:openFiles', { recursive }),
}

contextBridge.exposeInMainWorld(electronAPIKey, electronAPI)
