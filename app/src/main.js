'use strict'

const {
  app,
  dialog,
  ipcMain,
  BrowserWindow
} = require('electron')

const Save = require('./save.js')
const Logos = require('./logos.js').logos

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

app.on('ready', () => {
  // New Browser Window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL('file://' + __dirname + '/../index.html')

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Generate list of logos
  const logosURI = __dirname + '/../res/logos/'
  console.log(__dirname);
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

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})