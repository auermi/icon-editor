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

// DOM Refernces
const logoSelect = document.getElementById('logoSelect')
const logoColor = document.getElementById('logoColor')
const backgroundColor = document.getElementById('backgroundColor')
const colorButton = document.getElementById('colorButton')
const logo = document.getElementById('logo')

// Generate menu based on available icons
const logos = fs.readdirSync(__dirname + '/logos').filter((x) => {
  // Don't want system files
  return x.charAt(0) !== '.'
}).map((x) => {
  // Clean names without file extension
  return x.replace('.svg', '')
}).forEach((x) => {
  // Append an option to the select element
  const node = document.createElement('OPTION')
  node.appendChild(document.createTextNode(x))
  logoSelect.appendChild(node)
})

// When a new logo is selected, inject it
logoSelect.addEventListener('change', () => {
  const uri = __dirname + '/logos/' + logoSelect.value + '.svg'
  logo.innerHTML = fs.readFileSync(uri, 'utf-8', (err,data) => {
    if (err) throw error
    return data
  })
})

// Apply fill colors to svg
var applyStyles = () => {
  return () => {
    // Should disable fill buttons eventually but this works for now
    if (logoSelect.value === logoSelect.children[0].value) {
      return
    }
    document.querySelector('#logo path').style.fill = '#' + logoColor.value
    document.querySelector('#logo rect').style.fill = '#' + backgroundColor.value
  }
}

// Apply styles on click
colorButton.addEventListener('click', applyStyles())
