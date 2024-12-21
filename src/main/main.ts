/* eslint-disable @typescript-eslint/no-floating-promises */
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'
import contextMenu from 'electron-context-menu'
import started from 'electron-squirrel-startup'
import * as fs from 'fs'
import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SUPPORTED_FILE_EXTENSIONS } from '../constants'

process.env.APP_ROOT = path.join(import.meta.dirname, '..')

export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 1024,
    height: 768,
    webPreferences: {
      webSecurity: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(import.meta.dirname, 'preload.js'),
    },
  })

  // Enable context menu
  contextMenu()

  // Prevent the app from opening URLs; Open URLs in user's browser.
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).catch((err) => console.error('Error opening URL:', err))
    return { action: 'deny' }
  })

  // Load the index.html of the app
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    // Open the DevTools
    mainWindow.webContents.openDevTools()
  } else {
    await mainWindow.loadFile(path.join(import.meta.dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow().catch((err) => {
    console.error('Error creating window:', err)
  })
})

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay
// active until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other
  // windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow().catch((err) => {
      console.error('Error creating window:', err)
    })
  }
})

// ipcMain handlers
ipcMain.handle('dialog:openFiles', async (event, recursively) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  const result = await dialog.showOpenDialog(window, {
    properties: ['openDirectory', 'openFile', 'multiSelections'],
  })

  console.log('result', result)

  if (result.canceled) {
    return []
  } else {
    const files = []

    for (const rootDir of result.filePaths) {
      const pattern = path.join(rootDir, '**', `*.{${SUPPORTED_FILE_EXTENSIONS.join(',')}}`)
      const filePaths = await glob(pattern, { nocase: true })
      console.log('filePaths', filePaths)

      files.push(...filePaths.map(filePath => ({
        filePath
      })))
    }
    return files
  }
})
