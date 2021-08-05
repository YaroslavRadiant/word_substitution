const wind = document.createElement('div')
wind.classList.add('wind')
const firstChild = document.body.firstChild
document.body.insertBefore(wind, firstChild)

const btn1 = document.createElement('button')
const btn2 = document.createElement('button')
const btn3 = document.createElement('button')
const btn4 = document.createElement('button')

btn1.className = 'btnPlugin'
btn2.className = 'btnPlugin'
btn3.className = 'btnPlugin'
btn4.className = 'btnPlugin'

wind.appendChild(btn1)
wind.appendChild(btn2)
wind.appendChild(btn3)
wind.appendChild(btn4)

const catReg = /(\b(c|C)at\s)(?!.*\1)/
const HeloReg = /(\b(h|H)elo\s)(?!.*\1)/
const heldpReg = /(\b(h|H)eldp\s)(?!.*\1)/

let comboCollection = [
  ...document.querySelectorAll('[contenteditable]'),
  ...document.querySelectorAll('input[type="text"]'),
]

let collectionOfFrameInput = []
if (document.querySelectorAll('iframe')) {
  document.querySelectorAll('iframe').forEach((elem) => {
    let inputFrame = elem.contentWindow.document.getElementsByTagName('input')
    collectionOfFrameInput.push(inputFrame)
  })
}

collectionOfFrameInput.forEach((el) => {
  comboCollection.push(el[0])
})

const btnVal = (reg, target) => {
  wind.style.display = 'flex'
  if (reg === catReg) {
    btn1.textContent = 'Dog'
    btn2.textContent = 'Rat'
    btn3.textContent = 'bat'
    btn4.textContent = 'cat'
  } else if (reg === HeloReg) {
    btn1.textContent = 'hello'
    btn2.textContent = 'Help'
    btn3.textContent = 'Hell'
    btn4.textContent = 'Helo'
  } else if (reg === heldpReg) {
    btn1.textContent = 'help'
    btn2.textContent = 'held'
    btn3.textContent = 'hello'
    btn4.textContent = 'heldp'
  }
  btn1.onclick = () => onClickHandler(target, reg, btn1)
  btn2.onclick = () => onClickHandler(target, reg, btn2)
  btn3.onclick = () => onClickHandler(target, reg, btn3)
  btn4.onclick = () => onClickHandler(target, btn4.textContent, btn4)
}

function onClickHandler(target, reg, node) {
  target.localName === 'div'
    ? (target.textContent = target.textContent.replace(reg, node.textContent))
    : (target.value = target.value.replace(reg, node.textContent))

  wind.style.display = 'none'
}

comboCollection.forEach((elem) => {
  if (elem) {
    elem.oninput = () => {
      if (elem.localName === 'div') {
        if (elem.textContent.match(catReg)) {
          btnVal(catReg, elem)
        } else if (elem.textContent.match(HeloReg)) {
          btnVal(HeloReg, elem)
        } else if (elem.textContent.match(heldpReg)) {
          btnVal(heldpReg, elem)
        }
      } else {
        if (elem.value.match(catReg)) {
          btnVal(catReg, elem)
        } else if (elem.value.match(HeloReg)) {
          btnVal(HeloReg, elem)
        } else if (elem.value.match(heldpReg)) {
          btnVal(heldpReg, elem)
        }
      }
    }
  }
})
