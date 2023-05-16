class SiteController {
    home(req,res){
        res.render('home')
    }
    memoryCardGame(req,res) {
        res.render('memoryCardGame')
    }
    snakeGame(req,res) {
        res.render('snakeGame')
    }
    sudoku(req,res) {
        res.render('sudoku')
    }
}

module.exports = new SiteController
