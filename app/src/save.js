'use strict'

const {
  dialog
} = require('electron')
const fs = require('fs')
const gm = require('gm').subClass({
  imageMagick: true
})

const path = require('path');

const save = (arg) => {
  const localuri = path.resolve(__dirname, './../cache/icon.svg');
  // const localuri = __dirname + '/../cache/icon.svg'
  // If we have an svg
  if (arg.svg !== '') {
    // Save pop up
    dialog.showSaveDialog({
      defaultPath: process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/' + arg.name
    }, (fileName) => {
      // If we have filename
      if (fileName) {
        // Does a file with the same name exist already?
        // console.log(fs.readFile(fileName + '.png', (err, data) => { return err }))
        fs.readFile(fileName + '.png', (err, data) => {
          if (!err) {
            // It exists, show pop up -> if yes continue overrwrite, if no, cancel
            dialog.showMessageBox({
              message: 'File with name: ' + fileName + '.png already exists',
              detail: 'Do you want to overwrite it?',
              buttons: ['Yes', 'No']
            }, (response) => {
              if (response !== 1) {
                writeToPNG(fileName, localuri, arg)
              }
            })
          } else {
            writeToPNG(fileName, localuri, arg)
          }
        })
      }
    })
  } else {
    // No SVG on DOM
    dialog.showMessageBox({
      message: 'No Icon',
      detail: 'Add an icon by selecting one from the dropdown menu',
      buttons: ['Ok']
    })
  }
}

const writeToPNG = (fileName, localuri, arg) => {
  // Write to SVG
  fs.writeFileSync(localuri, arg.svg)
  // Write to PNG fom SVG
  // If invalid exist default to 256, 256
  const width = parseInt(arg.width)
  const height = parseInt(arg.height)
  if (!width || !height && typeof width !== 'number' || typeof height !== 'number') {
    gm(localuri)
      .resize(256, 256, '!')
      .write(fileName + '.png', (err) => {
        if (err) throw (err)
        // Delete the SVG
        fs.unlink(localuri, (err) => {
          if (err) throw (err)
        });
      })
  } else {
    gm(localuri)
      .resizeExact(width, height)
      .write(fileName + '.png', (err) => {
        if (err) throw (err)
        // Delete the SVG
        fs.unlink(localuri, (err) => {
          if (err) throw (err)
        });

      })
  }

}

exports.save = save