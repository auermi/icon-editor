'use strict'
const fs = require('fs')
const menu = require('./menu.js')
const gm = require('gm')
const ipcRenderer = require('electron').ipcRenderer

// Initialize Menu
menu.init()

// DOM Refernces
const logoSelect = document.getElementById('logoSelect')
const logoColor = document.getElementById('logoColor')
const backgroundColor = document.getElementById('backgroundColor')
const colorButton = document.getElementById('colorButton')
const saveButton = document.getElementById('saveButton')
const logo = document.getElementById('logo')
const radius = document.getElementById('radius')
const radiusLabel = document.getElementById('radiusLabel')

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

    // Reference bg rect and shape path
    const shape = document.querySelector('#logo path')
    const rect = document.querySelector('#logo rect')

    // Color fills
    shape.style.fill = '#' + logoColor.value
    rect.style.fill = '#' + backgroundColor.value

    // Border Radius
    rect.setAttribute('rx', radius.value)
    rect.setAttribute('ry', radius.value)
    radiusLabel.innerText = radius.value
  }
}

// Apply styles on click
colorButton.addEventListener('click', applyStyles())

// Save PNG after hitting the save button
saveButton.addEventListener('click', () => {
  ipcRenderer.send('save', logo.innerHTML)
})
