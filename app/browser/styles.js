'use strict'

// Apply fill colors to svg
const apply = () => {
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
        let bgColor = ''
        isValidHex(backgroundColor.value)
          ? bgColor =  '#' + backgroundColor.value
          : bgColor = '#000000'

        rect.setAttribute('fill', bgColor)
        rect.setAttribute('stroke', bgColor)
        // Border Radius
        rect.setAttribute('rx', radius.value)
      }
    // no bg
    } else {
      rect.style.opacity = 0
      circle.style.opacity = 0
    }

    // Fill logo
    isValidHex(logoColor.value)
      ? shape.setAttribute('fill', '#' + logoColor.value)
      : shape.setAttribute('fill', '#FFFFFF')

    if(document.querySelector('svg'))
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

backgroundColor.addEventListener('input', () => {
  if (backgroundColor.value.length === 6) {
    this.apply()
  }
})
backgroundIsActive.addEventListener('click', () => {
  this.apply()
})
backgroundIsCircle.addEventListener('click', () => {
  this.apply()
})
radius.addEventListener('change', () => {
  this.apply()
})
logoColor.addEventListener('input', () => {
  if (logoColor.value.length === 6) {
    this.apply()
  }
})
iconHeight.addEventListener('input', () => {
  this.apply()
})
iconWidth.addEventListener('input', () => {
  this.apply()
})
var resize = (w, h) => {
  let width = parseInt(w)
  let height = parseInt(h)
  if (!width || width === '' || typeof width !== 'number') {
    width = 256
  }
  if (!height || height === '' || typeof height !== 'number') {
    height = 256
  }

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

  document.querySelector('svg').style.transform = 'scaleX(' + widthScale + ') scaleY(' + heightScale + ')'
  sizeLabel.innerHTML = Math.ceil(width) + 'px x ' + Math.ceil(height) + 'px'
}

exports.apply = apply
