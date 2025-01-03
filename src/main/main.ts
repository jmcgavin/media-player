import crypto from 'crypto'
import { BrowserWindow, app, dialog, ipcMain, protocol, shell } from 'electron'
import contextMenu from 'electron-context-menu'
import started from 'electron-squirrel-startup'
import { promises as fs } from 'fs'
import { glob } from 'glob'
import path from 'node:path'

import { FILE_TYPES, IMAGE_FILE_TYPES } from '../constants'
import type { Data } from '../types/data'

process.env.APP_ROOT = path.join(import.meta.dirname, '..')

export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

const MEDIA_PROTOCOL_SCHEME = 'media'

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

protocol.registerSchemesAsPrivileged([
  {
    scheme: MEDIA_PROTOCOL_SCHEME,
    privileges: {
      secure: true,
      standard: true,
      stream: true,
      supportFetchAPI: true,
      bypassCSP: true,
    },
  },
])

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow().catch((err) => {
    console.error('Error creating window:', err)
  })

  protocol.registerFileProtocol(MEDIA_PROTOCOL_SCHEME, (request, callback) => {
    const url = request.url.replace(`${MEDIA_PROTOCOL_SCHEME}://`, '')
    try {
      return callback(decodeURIComponent(url))
    } catch (error) {
      console.error(error)
    }
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
ipcMain.handle('dialog:openFiles', async (event, { recursive }) => {
  const paths: string[] = []
  const window = BrowserWindow.fromWebContents(event.sender)
  const result = await dialog.showOpenDialog(window, {
    properties: ['openDirectory', 'openFile', 'multiSelections'],
    filters: [{ name: 'Media', extensions: FILE_TYPES }],
  })

  for (const filePath of result.filePaths) {
    const stats = await fs.stat(filePath)

    if (stats.isFile()) {
      paths.push(filePath)
    }

    if (stats.isDirectory()) {
      const pattern = recursive
        ? path.join(filePath, '**', `*.{${FILE_TYPES.join(',')}}`)
        : path.join(filePath, `*.{${FILE_TYPES.join(',')}}`)
      const nestedPaths = await glob(pattern, { nocase: true })
      paths.push(...nestedPaths)
    }
  }

  const data: Data[] = paths.map((filePath) => {
    const extension = path.extname(filePath).slice(1) // File extension without "."
    const imageTypeRegex = new RegExp(IMAGE_FILE_TYPES.join('|'), 'i')
    return {
      id: crypto.randomUUID(),
      name: path.basename(filePath),
      path: filePath,
      extension,
      dataType: imageTypeRegex.test(extension) ? 'image' : 'video',
    }
  })

  return data
})
