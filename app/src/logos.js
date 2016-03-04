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
  var _getSVG = (uri) => {
    return fs.readFileSync(uri, 'utf-8', (err,data) => {
      if (err) throw error
      return data
    })
  }
  return {
    getAll: _getAll,
    getSVG: _getSVG
  }


})()

exports.logos = logos
