const playBtn = document.querySelector('.playButton')
const modeClient = /*html*/ `
            <div class='modeWrapper'>
                <button class='closeButton' onclick='removeModeClient()'>X</button>
                <div class='modeContainer'>
                    <a href="/memoryCardGame"><button>Memory Card Game</button></a>
                    <a href="/snakeGame"><button>Snake Game</button></a>
                    <a href="/sudoku"><button>Sudoku Game</button></a>
                </div>
            </div>
        `
const closeBtn = document.querySelector('.closeButton')

function removeModeClient() {
    document.querySelector('.modeWrapper').remove()
}

playBtn.addEventListener('click', () => {
    document.body.insertAdjacentHTML('afterbegin', modeClient)
})