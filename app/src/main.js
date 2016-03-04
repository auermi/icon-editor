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
    // If we have an svg
    if (svg !== '') {
      // Save pop up
      dialog.showSaveDialog((fileName) => {
        // Does a file with the same name exist already?
        if (fs.readFile(fileName + '.png', (err, data) => { return err }) !== null) {
          // It exists, show pop up -> if yes continue overrwrite, if no, cancel
          dialog.showMessageBox({
            message: 'File with name: ' + fileName + '.png already exists',
            detail: 'Do you want to overwrite it?',
            buttons: ['Yes', 'No']
          }, (response) => {
            if (response === 1) {
              return
            } else {
              // Write to SVG
              const localuri = __dirname + '/../.cache/icon.svg'
              fs.writeFileSync(localuri, svg)
              // Write to PNG fom SVG
              gm(localuri)
              .write(fileName + '.png', (err) => {
                if (err) throw (err)
                // Delete the SVG
                fs.unlink(localuri)
              })
            }
          })
        }
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
