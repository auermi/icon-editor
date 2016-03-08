'use strict'

const menu = require('./menu.js')
const ipcRenderer = require('electron').ipcRenderer
const styles = require('./styles.js')

// Initialize Menu
menu.init()

// DOM Refernces
const logoSelect = document.getElementById('logoSelect')
const logoColor = document.getElementById('logoColor')
const backgroundColor = document.getElementById('backgroundColor')
const backgroundIsActive = document.getElementById('backgroundIsActive')
const backgroundIsCircle = document.getElementById('backgroundIsCircle')
const logo = document.getElementById('logo')
const radius = document.getElementById('radius')
const sizeLabel = document.getElementById('sizeLabel')
const iconWidth = document.getElementById('iconWidth')
const iconHeight = document.getElementById('iconHeight')

// Generate menu based on available icons
ipcRenderer.on('getAllLogos', (event, message) => {
  message.forEach((x) => {
    // Append an option to the select element
    const node = document.createElement('OPTION')
    node.appendChild(document.createTextNode(x))
    logoSelect.appendChild(node)
  })
})

// When a new logo is selected, inject it
logoSelect.addEventListener('change', () => {
  ipcRenderer.send('getSVG', logoSelect.value)
  ipcRenderer.on('sendLogoSVG', (event, message) => {
    logo.innerHTML = message
    styles.apply()
    sizeLabel.style.display = 'block'
  })
})
