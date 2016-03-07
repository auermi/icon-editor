'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = require('browser-window')
const dialog = electron.dialog
const ipcMain = electron.ipcMain
const Save = require('./save.js')
const Logos = require('./logos.js').logos

let mainWindow

app.on('ready', () => {
  // New Browser Window
  mainWindow = new BrowserWindow({
      width: 800,
      height: 600
  })

  mainWindow.loadURL('file://' + __dirname + '/../index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Generate list of logos
  const logosURI = __dirname + '/../res/logos/'
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('getAllLogos', Logos.getAll(logosURI))
  })
  // Renderer Listeners
  ipcMain.on('save', (event, arg) => {
    Save.save(arg)
  })
  ipcMain.on('getSVG', (event, arg) => {
    const uri = logosURI + arg + '.svg'
    mainWindow.webContents.send('sendLogoSVG', Logos.getSVG(uri))
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
