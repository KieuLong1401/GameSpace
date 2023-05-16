const numChoosers = document.querySelectorAll('.numberChooser')
const eraseBtn = document.querySelector('.eraseBtn')
const buttonWrapper = document.querySelector('.buttonWrapper')
const level = 20
const winAnnounce = /*html*/ `
    <div class='winAnnounce'>
        <h1>Win</h1>
        <div class='buttonContainer'>
            <button onclick = reset()>Play Again</button>
            <a href = '/'><button>Home</button></a>
        </div>
    </div>
`

var firstBtnArr = []
for (let i = 0; i < 9; i++) {
    firstBtnArr.push(new Array(9).fill('.'))
}
generateSudoku()
generateEmptyCell(firstBtnArr)

var btnArr = firstBtnArr


for (let i = 0; i < 9; i++) {
    let newRow = document.createElement('div')
    newRow.classList.add('row')
    for (let j = 0; j < 9; j++) {
        let newBtn = document.createElement('div')
        newBtn.classList.add('numBtn')
        newBtn.id = `${i}_ ${j}`
        if (btnArr[i][j] != '.') {
            newBtn.innerText = btnArr[i][j]
            newBtn.classList.add('default')
        }
        if ((i + 1) % 3 == 0) {
            newBtn.style.borderBottom = 'solid black 2px'
        }
        if (i == 0 || i % 3 == 0) {
            newBtn.style.borderTop = 'solid black 2px'
        }
        if ((j + 1) % 3 == 0) {
            newBtn.style.borderRight = 'solid black 2px'
        }
        if (j == 0 || j % 3 == 0) {
            newBtn.style.borderLeft = 'solid black 2px'
        }
        newRow.appendChild(newBtn)
    }
    buttonWrapper.appendChild(newRow)
}

document.querySelectorAll('.numBtn').forEach(e => {
    e.addEventListener('click', () => {
        if (!e.classList.contains('default')) {
            let lastChoosingElement = document.querySelector('.choosing')
            if (lastChoosingElement) {
                lastChoosingElement.classList.remove('choosing')
            }
            e.classList.add('choosing')
        }
    })
})

numChoosers.forEach(e => {
    e.addEventListener('click', () => {
        const choosing = document.querySelector('.choosing')
        if(choosing) {
            let value = e.innerText
            changeValue(value)
            const choosingId = choosing.id.split('_')
            const choosingRow = parseInt(choosingId[0])
            const choosingCol = parseInt(choosingId[1])
            if (check(parseInt(value), choosingRow, choosingCol, btnArr) || parseInt(value) == btnArr[i][j]) {
                choosing.style.backgroundColor = 'white'
                btnArr[i][j] = value == '.' ? '.' : parseInt(value)
            } else {
                choosing.style.backgroundColor = 'red'
                btnArr[i][j] = value == '.' ? '.' : parseInt(value)
            }
            if(findEmptyCell(btnArr) == null) {
                if(checkAllArr(btnArr)) {
                    win()
                }
            }
        }
    })
})

eraseBtn.addEventListener('click', () => {
    changeValue('')
    document.querySelector('.choosing').style.backgroundColor = 'white'
    const choosing = document.querySelector('.choosing')
    const choosingId = choosing.id.split('_')
    const choosingRow = parseInt(choosingId[0])
    const choosingCol = parseInt(choosingId[1])
    btnArr[choosingRow][choosingCol] = '.'
})

function generateSudoku() {
    const emptyCell = findEmptyCell(firstBtnArr)
    if (emptyCell == null) {
        return true
    }
    const [row, col] = emptyCell

    var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    numArr = shuffleArray(numArr)

    for (let i = 0; i < numArr.length; i++) {
        const num = numArr[i]
        if (check(num, row, col, firstBtnArr)) {
            firstBtnArr[row][col] = num
            if (generateSudoku()) {
                return true
            }
            firstBtnArr[row][col] = '.'
        }
    }
    return false
}

function findEmptyCell(arr) {
    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[row].length; col++) {
            if (arr[row][col] == '.') {
                return [row, col]
            }
        }
    }
    return null
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateEmptyCell(arr) {
    var cellToEmpty = level
    while (true) {
        var row = Math.floor(Math.random() * 9)
        var col = Math.floor(Math.random() * 9)
        if (arr[row][col] != '.') {
            arr[row][col] = '.'
            cellToEmpty--
        }
        if (cellToEmpty < 1) {
            break
        }
    }
}

function check(num, row, col, arr) {
    for (let i = 0; i < 9; i++) {
        if (arr[row][i] == num || arr[i][col] == num) {
            return false
        }
    }


    let rowStart = Math.floor(row / 3) * 3;
    let colStart = Math.floor(col / 3) * 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
            if (arr[i][j] == num) {
                return false
            }
        }
    }

    return true
}

function checkAllArr(arr) {
    for(let row = 0; row < arr.length; row++) {
        var rowBox = new Set()
        var colBox = new Set()
        var squareBox = new Set()
        for(let col = 0; col < arr[row].length; col++) {
            colNum = arr[row][col]
            rowNum = arr[col][row]
            squareCharacter = arr[Math.floor(col / 3) + (row % 3) * 3][col % 3 + ((row * 3) % 9)]
            if(colBox.has(colNum) || rowBox.has(rowNum) || squareBox.has(squareCharacter)) {
                return false
            }

            colBox.add(colNum)
            rowBox.add(rowNum)
            squareBox.add(squareCharacter)
        }
        colBox.clear()
        rowBox.clear()
        squareBox.clear()
    }
    return true
}

function changeValue(value) {
    const choosing = document.querySelector('.choosing')
    choosing.innerText = value
    let choosingId = choosing.id.split('_')
    i = parseInt(choosingId[0])
    j = parseInt(choosingId[1])
}

function reset() {
    window.location.reload()

}

function win() {
    document.body.insertAdjacentHTML('afterbegin', winAnnounce)
}
