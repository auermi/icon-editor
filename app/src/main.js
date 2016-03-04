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

  mainWindow.loadURL('file://' + __dirname + '/../index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Renderer Listeners
  ipcMain.on('save', (event, arg) => {
    const svg = arg
    if (svg !== '') {
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
    } else {
      dialog.showMessageBox({
        message: 'No Icon',
        detail: 'Add an icon by selecting one from the dropdown menu',
        buttons: ['Ok']
      })
    }
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
