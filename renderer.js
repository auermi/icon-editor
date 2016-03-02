'use strict'

const remote = require('remote')
const Menu = remote.require('menu')
const fs = require('fs')

// Menu Generation
var menu = Menu.buildFromTemplate([
  {
    submenu: [
      {
        label: 'About',
        click: function() { /* Would open an about page */ }
      }
    ]
  }
])
Menu.setApplicationMenu(menu)

const logoSelect = document.getElementById('logoSelect')

// Generate menu based on available icons
const logos = fs.readdirSync(__dirname + '/logos').filter(function(x) {
  return x.charAt(0) !== '.'
}).map(function(x) {
  return x.replace('.svg', '')
}).forEach(function(x) {
  const node = document.createElement('OPTION')
  node.appendChild(document.createTextNode(x))
  logoSelect.appendChild(node)
})
