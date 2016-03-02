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
        click: () => { /* Would open an about page */ }
      }
    ]
  }
])
Menu.setApplicationMenu(menu)

const logoSelect = document.getElementById('logoSelect')
const logo = document.getElementById('logo')

// Generate menu based on available icons
const logos = fs.readdirSync(__dirname + '/logos').filter((x) => {
  return x.charAt(0) !== '.'
}).map((x) => {
  return x.replace('.svg', '')
}).forEach((x) => {
  const node = document.createElement('OPTION')
  node.appendChild(document.createTextNode(x))
  logoSelect.appendChild(node)
})

logoSelect.addEventListener('change', () => {
  if (logoSelect.value === logoSelect.children[0].innerText) {
    logo.innerHTML = ''
    return
  }
  const uri = __dirname + '/logos/' + logoSelect.value + '.svg'
  logo.innerHTML = fs.readFileSync(uri, 'utf-8', (err,data) => {
    if (err) throw error
    return data
  })
})
