const remote = require('remote')
const Menu = remote.require('menu')

var init = function() {
  // Menu Generation
  var menu = Menu.buildFromTemplate([
    {
      submenu: [
        {
          label: 'About',
          click: () => { /* Would open an about page */ }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}

exports.init = init
