'use strict'

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
          click: () => {
            ipcRenderer.send('save',
            {
              svg: logo.innerHTML,
              name: logoSelect.value,
              width: document.getElementById('iconWidth').value,
              height: document.getElementById('iconHeight').value
            }
          )}
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'CmdOrCtrl+Y',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}

exports.init = init
