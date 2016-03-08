'use strict'

const menu = require('./menu.js')
const ipcRenderer = require('electron').ipcRenderer
const styles = require('./styles.js')

var init = () => {
  // Initialize Menu
  menu.init()

  const logoSelect = document.getElementById('logoSelect')

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
      document.getElementById('logo').innerHTML = message
      styles.apply()
      document.getElementById('sizeLabel').style.display = 'block'
      selectInstruction.style.display = 'none'
    })
  })
}



exports.init = init
