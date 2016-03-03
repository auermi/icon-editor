'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = require('browser-window')
const dialog = electron.dialog
const ipcMain = electron.ipcMain
const fs = require('fs')
const gm = require('gm')

app.on('ready', () => {
  // New Browser Window
  const mainWindow = new BrowserWindow({
      width: 800,
      height: 600
  })

  mainWindow.loadURL('file://' + __dirname + '/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Renderer Listeners
  ipcMain.on('save', (event, arg) => {
    const svg = arg
    // Save pop up
    dialog.showSaveDialog((fileName) => {
      // Write to SVG
      fs.writeFileSync(fileName + '.svg', svg)
      // Write to PNG fom SVG
      gm(fileName + '.svg')
      .write(fileName + '.png', (err) => {
        if (err) throw (err)
        // Delete the SVG
        fs.unlink(fileName + '.svg')
      })
    })
  })
})
