const canvas = document.querySelector('.canvas')
const c = canvas.getContext('2d')
const gridSize = 30
canvas.width = gridSize * 25
canvas.height = gridSize * 20
const scoreText = document.querySelector('.score')
const snakeSpeed = 3

const loseAnnounce = /*html*/ `
    <div class='loseAnnounce'>
        <h1>You Lose</h1>
        <div class='buttonContainer'>
            <button onclick = reset()>Play Again</button>
            <a href = '/'><button>Home</button></a>
        </div>
    </div>
`

var lastKey
var isDie = false
var score = 0

class Snake {
    constructor() {
        this.head = {
            x: canvas.width / 2 - gridSize / 2,
            y: canvas.height / 2 - gridSize / 2,
        }
        this.speed = {
            x: 0,
            y: -snakeSpeed,
        }
        this.body = []
        this.length = 0
    }
    draw() {
        this.body.forEach(e => {
            c.fillStyle = 'rgb(219, 154, 13)'
            c.fillRect(e.x, e.y, gridSize, gridSize)
            if((this.head.x < e.x && this.head.x + gridSize > e.x || 
                this.head.x > e.x && this.head.x < e.x + gridSize) && 
                (this.head.y < e.y && this.head.y + gridSize > e.y || 
                this.head.y > e.y && this.head.y < e.y + gridSize) &&
                this.body.indexOf(e) <= this.body.length -30) {
                    die()
                }
        })
        c.fillStyle = 'yellow'
        c.fillRect(this.head.x, this.head.y, gridSize, gridSize)
    }
    eat() {
        food.x = Math.floor(Math.random() * ((canvas.width / gridSize) - 1)) * gridSize
        food.y = Math.floor(Math.random() * ((canvas.height / gridSize) - 1)) * gridSize
        this.length += 5
        scoreText.innerText = `Score: ${this.length}`
    }
    update() {
        this.head.x += this.speed.x
        this.head.y += this.speed.y
        this.draw()
        if (this.head.x == food.x && this.head.y == food.y) {
            this.eat()
        }
        bodyAdd()
        if (this.head.x > canvas.width) {
            this.head.x = 0 - gridSize / 2
        }
        if (this.head.x < -gridSize) {
            this.head.x = canvas.width - gridSize / 2
        }
        if (this.head.y > canvas.height) {
            this.head.y = 0 - gridSize / 2
        }
        if (this.head.y < -gridSize) {
            this.head.y = canvas.height - gridSize / 2
        }
    }
}
const snake = new Snake()

class Food {
    constructor() {
        this.x = Math.floor(Math.random() * ((canvas.width / gridSize) - 1)) * gridSize
        this.y = Math.floor(Math.random() * ((canvas.height / gridSize) - 1)) * gridSize
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.x + gridSize / 4, this.y + gridSize / 4, gridSize / 2, gridSize / 2)
    }
}

var food = new Food()

window.addEventListener('keydown', keyHandler)

function checkKey(key) {
    if (snake.head.x % gridSize == 0 && snake.head.y % gridSize == 0 && key != null) {
        switch (key) {
            case 'w':
                snake.speed.x = 0
                snake.speed.y = -snakeSpeed
                break
            case 's':
                snake.speed.x = 0
                snake.speed.y = snakeSpeed
                break
            case 'a':
                snake.speed.y = 0
                snake.speed.x = -snakeSpeed
                break
            case 'd':
                snake.speed.y = 0
                snake.speed.x = snakeSpeed
                break
        }
    }
}

function die() {
    window.removeEventListener('keydown', keyHandler)
    snake.speed.x = 0
    snake.speed.y = 0
    isDie = true
    document.body.insertAdjacentHTML('afterbegin', loseAnnounce)
}

function reset() {
    window.location.reload()
}

function keyHandler(e) {
    if (e.key == 'd' && snake.speed.x != -snakeSpeed) {
        lastKey = 'd'
        return
    }
    if (e.key == 'a' && snake.speed.x != snakeSpeed) {
        lastKey = 'a'
        return
    }
    if (e.key == 'w' && snake.speed.y != snakeSpeed) {
        lastKey = 'w'
        return
    }
    if (e.key == 's' && snake.speed.y != -snakeSpeed) {
        lastKey = 's'
        return
    }
}

function bodyAdd() {
    if (isDie) {
        return
    }
    if (snake.length < snake.body.length) {
        snake.body.shift()
    }
    snake.body.push({ x: snake.head.x, y: snake.head.y})
}

setInterval(() => {
    checkKey(lastKey)
}, 1);

function update() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    snake.update()
    food.draw()
    requestAnimationFrame(update)
}
update()