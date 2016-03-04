'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = require('browser-window')
const dialog = electron.dialog
const ipcMain = electron.ipcMain
const Save = require('./save.js')

app.on('ready', () => {
  // New Browser Window
  const mainWindow = new BrowserWindow({
      width: 800,
      height: 600
  })

  mainWindow.loadURL('file://' + __dirname + '/../index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Renderer Listeners
  ipcMain.on('save', (event, arg) => {
    Save.save(arg)
  })
  ipcMain.on('about', () => {
    const date = new Date()
    dialog.showMessageBox({
      message: 'Icon Generator by Michael Auer',
      detail: 'Thank you for using Icon Generator. Copyright ' + date.getFullYear(),
      buttons: ['Close']
    })
  })
})
