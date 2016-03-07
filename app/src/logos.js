'use strict'

const fs = require('fs')

const logos = (() => {
  const _getAll = (logosURI) =>
    fs.readdirSync(logosURI).filter((x) => {
      // Don't want system files
      return x.charAt(0) !== '.'
    }).map((x) => {
      // Clean names without file extension
      return x.replace('.svg', '')
    }).map((x) => {
      // Capitalize the first letter
      return x.charAt(0).toUpperCase() + x.substring(1, x.length)
    })
  const _getSVG = (uri) => {
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
