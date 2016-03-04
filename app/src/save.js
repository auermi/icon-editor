const dialog = require('electron').dialog
const fs = require('fs')
const gm = require('gm')

var save = (arg) => {
  const svg = arg
  // If we have an svg
  if (svg !== '') {
    // Save pop up
    dialog.showSaveDialog((fileName) => {
      // If we have filename
      if (fileName) {
        // Does a file with the same name exist already?
        if (fs.readFile(fileName + '.png', (err, data) => { return err }) !== null) {
          // It exists, show pop up -> if yes continue overrwrite, if no, cancel
          dialog.showMessageBox({
            message: 'File with name: ' + fileName + '.png already exists',
            detail: 'Do you want to overwrite it?',
            buttons: ['Yes', 'No']
          }, (response) => {
            if (response === 1) {
              return
            } else {
              // Write to SVG
              const localuri = __dirname + '/../.cache/icon.svg'
              fs.writeFileSync(localuri, svg)
              // Write to PNG fom SVG
              gm(localuri)
              .write(fileName + '.png', (err) => {
                if (err) throw (err)
                // Delete the SVG
                fs.unlink(localuri)
              })
            }
          })
        }
      } else {
        return // Hit cancel on save dialog
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

exports.save = save
