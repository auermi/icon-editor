'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = require('browser-window')

app.on('ready', function() {
  // New Browser Window
  const mainWindow = new BrowserWindow({
      width: 800,
      height: 600
  })

  mainWindow.loadURL('file://' + __dirname + '/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
})
