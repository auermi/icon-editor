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
        isValidHex(backgroundColor.value)
          ? rect.setAttribute('fill', '#' + backgroundColor.value)
          : rect.setAttribute('fill', '#000000')
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

exports.apply = apply
