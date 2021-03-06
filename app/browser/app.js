'use strict'

const {
  ipcRenderer
} = require('electron')
const styles = require('./styles.js')
const
  exportLogo = require('./exportLogo.js');

const init = () => {

  const logoSelect = document.getElementById('logoSelect');
  const exportButton = document.getElementById('logoExport');

  // Generate menu based on available icons
  ipcRenderer.on('getAllLogos', (event, message) => {
    message.forEach((x) => {
      // Append an option to the select element
      const node = document.createElement('OPTION')
      node.appendChild(document.createTextNode(x))
      logoSelect.appendChild(node)
    })
  });

  ipcRenderer.on('log', (event, message) => {
    console.log(message);
  });

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

  exportButton.addEventListener('click', () => {
    ipcRenderer.send('save', exportLogo.exportLogo());
  });
}



exports.init = init