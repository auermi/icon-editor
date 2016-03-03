const remote = require('remote')
const Menu = remote.require('menu')
const ipcRenderer = require('electron').ipcRenderer

var init = function() {
  // Menu Generation
  var menu = Menu.buildFromTemplate([
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
          click: () => { ipcRenderer.send('save', logo.innerHTML) }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}

exports.init = init
