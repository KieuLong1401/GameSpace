const express = require('express')
const router = express.Router()
const sitesController = require('../app/controllers/SiteController')

router.get('/', sitesController.home)
router.get('/memoryCardGame', sitesController.memoryCardGame)
router.get('/snakeGame', sitesController.snakeGame)
router.get('/sudoku', sitesController.sudoku)

module.exports = router
