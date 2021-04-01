const express = require('express')
const router = express.Router()
const Game = require('../models/game')

router.get('/', async (req, res) => {
    try {
        const games = await Game.find({})
        res.render('index', {games: games})
    } catch {
        console.error('Error finding games')
    }
    
})

module.exports = router