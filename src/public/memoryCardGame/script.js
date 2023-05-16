const cards = document.querySelectorAll('.card')
const clickTimeText = document.querySelector('.clickTime')
const image = ['banana', 'banana', 'waterMelon', 'waterMelon',
    'strawBerry', 'strawBerry', 'kiwi', 'kiwi', 'apple', 'apple',
    'orange', 'orange', 'grapes', 'grapes', 'blueBerry', 'blueBerry']
const winAnnounce = /*html*/ `
    <div class='winAnnounce'>
        <h1>Win</h1>
        <div class='buttonContainer'>
            <button onclick = reset()>Play Again</button>
            <a href = '/'><button>Home</button></a>
        </div>
    </div>
`

var cardsLength = cards.length
var firstCard = undefined
var checking = false
var toWin = cardsLength / 2
var clickTime = 0


function reset() {
    window.location.reload()
}
function hide(card) {
    card.style.visibility = 'hidden'
}
function turnUp(card) {
    card.style.backgroundImage = `url(/img/${card.img}.jpg)`
}
function turnDown(card) {
    card.style.backgroundImage = 'url(/img/questionMark.jpg)'
}

cards.forEach(card => {
    let randomIndex = Math.floor(Math.random() * cardsLength)
    card.img = image.splice(randomIndex, 1)
    cardsLength--
    card.addEventListener('click', () => {
        if (checking) {
            ;
        } else {
            turnUp(card)
            if (firstCard == undefined) {
                firstCard = card
                clickTime++
                clickTimeText.innerText = `Click Time: ${clickTime}`
            } else if (firstCard == card) {
                ;
            } else if (card.img.toString() == firstCard.img.toString()) {
                checking = true
                toWin--
                setTimeout(() => {
                    hide(card)
                    hide(firstCard)
                    console.log('pass')
                    firstCard = undefined
                    checking = false
                }, '500')
            } else if (card.img.toString() != firstCard.img.toString()) {
                checking = true
                setTimeout(() => {
                    turnDown(card)
                    turnDown(firstCard)
                    firstCard = undefined
                    checking = false
                }, '1000')
            }
        }
        if (toWin <= 0) {
            document.body.insertAdjacentHTML('afterbegin', winAnnounce)
        }
    })
})