'use strict'
const menu = require('./menu.js')
const ipcRenderer = require('electron').ipcRenderer

// Initialize Menu
menu.init()

// DOM Refernces
const logoSelect = document.getElementById('logoSelect')
const logoColor = document.getElementById('logoColor')
const backgroundColor = document.getElementById('backgroundColor')
const backgroundIsActive = document.getElementById('backgroundIsActive')
const backgroundIsCircle = document.getElementById('backgroundIsCircle')
const colorButton = document.getElementById('colorButton')
const logo = document.getElementById('logo')
const radius = document.getElementById('radius')
const radiusLabel = document.getElementById('radiusLabel')

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
    applyStyles()
  })
})

// Apply fill colors to svg
const applyStyles = () => {
    const circle = document.querySelector('#logo circle')
    const rect = document.querySelector('#logo rect')
    const shape = document.querySelector('#logo path')

    // Should disable fill buttons eventually but this works for now
    if (logoSelect.value === logoSelect.children[0].value) {
      return
    }
    // is bg
    if (backgroundIsActive.checked) {
      // is circle
      if (backgroundIsCircle.checked) {
        circle.style.opacity = 1
        rect.style.opacity = 0
        isValidHex(backgroundColor.value)
          ? circle.setAttribute('fill', '#' + backgroundColor.value)
          : circle.setAttribute('fill', '#000000')
      // is rect
      } else {
        circle.style.opacity = 0
        rect.style.opacity = 1
        isValidHex(backgroundColor.value)
          ? rect.setAttribute('fill', '#' + backgroundColor.value)
          : rect.setAttribute('fill', '#000000')
        // Border Radius
        rect.setAttribute('rx', radius.value)
      }
    // no bg
    } else {
      rect.style.opacity = 0
      circle.style.opacity = 0
    }

    // Fill logo
    shape.style.fill = '#' + logoColor.value

    // Radius label is equal to slider value
    radiusLabel.innerText = radius.value
}

// Apply styles on click
colorButton.addEventListener('click', applyStyles)

const isValidHex = (x) => {
  // If x isnt null
  if (x) {
    // validate
    let re = new RegExp('[0-9a-f]{6}', 'i')
    if (x.length === 6 && re.test(x)) {
      return true
    }
  }
  return false
}
