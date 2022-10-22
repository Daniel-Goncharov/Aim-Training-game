const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const timer = document.querySelector('#time')
const restartBtn = document.querySelector('#restartBtn')
const colors = ['red', 'blue', 'green', 'yellow', 'Lime', 'Orange', 'purple', 'Aqua', 'LightCoral', 'Crimson', 'MediumVioletRed', 'DodgerBlue'];
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

restartBtn.addEventListener('click', () => {
  location.reload()
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomeCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomeCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}
  
function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  restartBtn.classList.remove('hide')
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

function createRandomeCircle() {
  const circle = document.createElement('div')
  const size = getRandomNamber(10, 60)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNamber(0, width - size)
  const y = getRandomNamber(0, height - size)
  const color = getRandomColor();
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  board.append(circle)
}

function getRandomNamber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}