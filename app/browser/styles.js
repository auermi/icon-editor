'use strict'

// Apply styles
const apply = () => {
  const logoColor = document.getElementById('logoColor')
  const backgroundColor = document.getElementById('backgroundColor')
  const backgroundIsActive = document.getElementById('backgroundIsActive')
  const backgroundIsCircle = document.getElementById('backgroundIsCircle')
  const iconWidth = document.getElementById('iconWidth')
  const iconHeight = document.getElementById('iconHeight')
  const sizeIsContrained = document.getElementById('sizeIsContrained')
  const circle = document.querySelector('#logo circle')
  const rect = document.querySelector('#logo rect')
  const shapes = [].slice.call(document.getElementById('logo').getElementsByTagName('path'))
  
  // Should disable fill buttons eventually but this works for now
  if (logoSelect.value === logoSelect.children[0].value) {
    return
  }
  // is bg
  if (backgroundIsActive.checked) {
    // is circle or rect
    if (backgroundIsCircle.checked) {
      circle.style.opacity = 1
      rect.style.opacity = 0
      isValidHex(backgroundColor.value) ? circle.setAttribute('fill', '#' + backgroundColor.value) : circle.setAttribute('fill', '#000000')
      rect.setAttribute('fill', '')
      rect.setAttribute('stroke', '')
    } else {
      circle.style.opacity = 0
      rect.style.opacity = 1
      let bgColor = ''
      isValidHex(backgroundColor.value) ? bgColor = '#' + backgroundColor.value : bgColor = '#000000'
      rect.setAttribute('fill', bgColor)
      rect.setAttribute('stroke', bgColor)
        // Border Radius
      rect.setAttribute('rx', document.getElementById('radius').value)
    }
    // no bg
  } else {
    rect.style.opacity = 0
    circle.style.opacity = 0
  }

  // Fill logo
  if (isValidHex(logoColor.value)) {
    shapes.forEach(x => x.setAttribute('fill', '#' + logoColor.value))
  } else {
    shapes.forEach(x => x.setAttribute('fill', '#FFFFFF'))
  }

  // If there's an svg resize it
  if (document.querySelector('svg'))
    resize(iconWidth.value, iconHeight.value)
}

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

const resize = (w, h) => {
  let width = parseInt(w)
  let height = parseInt(h)
    // If width or height are invalid make them 256
  if (!width || width === '' || typeof width !== 'number') {
    width = 256
  }
  if (!height || height === '' || typeof height !== 'number') {
    height = 256
  }

  // Essentially Contstraining the svg inside a 256px box
  if (width >= 256 || height >= 256) {
    if (width > height) {
      const ratio = height / width
      width = 256
      height = 256 * ratio
    } else if (height > width) {
      const ratio = height / width
      height = 256
      width = 256 / ratio
    } else if (height === width) {
      height = 256
      width = 256
    }
  }
  const widthScale = width / 256
  const heightScale = height / 256

  // Scale the svg based on the supplied dimensions
  document.querySelector('svg').style.transform = 'scaleX(' + widthScale + ') scaleY(' + heightScale + ')'
  // Update label below svg
  document.getElementById('sizeLabel').innerHTML = Math.ceil(width) + 'px x ' + Math.ceil(height) + 'px'
}

const constrain = () => {
  if (sizeIsContrained.checked) {
    iconHeight.disabled = true
    if (typeof parseInt(iconWidth.value) === 'number') {
      iconHeight.value = iconWidth.value
    } else if (typeof parseInt(iconHeight.value) === 'number') {
      iconWidth.value = iconHeight.value
    } else {
      iconHeight.value = ''
      iconWidth.value = ''
    }
    this.apply()
  } else {
    iconHeight.disabled = false
  }
}

// Listeners for days
[
  backgroundColor,
  logoColor,
  iconHeight,
  iconWidth
].forEach((x) => {
  x.addEventListener('input', () => {
    constrain()
    this.apply()
  })
})
backgroundIsActive.addEventListener('click', () => {
  this.apply()
})
backgroundIsCircle.addEventListener('click', () => {
  this.apply()
})
document.getElementById('radius').addEventListener('change', () => {
  this.apply()
})
sizeIsContrained.addEventListener('click', () => {
  constrain()
})

exports.apply = apply
