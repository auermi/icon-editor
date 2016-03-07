const remote = require('remote')
const Menu = remote.require('menu')
const ipcRenderer = require('electron').ipcRenderer

// Menu Generation
const init = function() {
  const menu = Menu.buildFromTemplate([
    {
      submenu: [
        {
          label: 'About',
          click: () => { ipcRenderer.send('about') }
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => { ipcRenderer.send('save', logo.innerHTML) }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}

exports.init = init
