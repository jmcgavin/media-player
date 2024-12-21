import { contextBridge, ipcRenderer } from 'electron'

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
  openFiles: (recursively: boolean): Promise<string> => ipcRenderer.invoke('dialog:openFiles', { recursively }),
}

contextBridge.exposeInMainWorld(electronAPIKey, electronAPI)
