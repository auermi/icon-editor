'use strict'

const exportLogo = () => {
  return {
    svg: document.getElementById('logo').innerHTML,
    name: document.getElementById('logoSelect').value,
    width: document.getElementById('iconWidth').value,
    height: document.getElementById('iconHeight').value
  }
};

exports.exportLogo = exportLogo;