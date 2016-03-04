const fs = require('fs')

var logos = (() => {
  var _getAll = (logosURI) =>
    fs.readdirSync(logosURI).filter((x) => {
      // Don't want system files
      return x.charAt(0) !== '.'
    }).map((x) => {
      // Clean names without file extension
      return x.replace('.svg', '')
    })
  return {
    getAll: _getAll
  }
})()

exports.logos = logos
