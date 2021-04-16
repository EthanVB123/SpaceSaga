const express = require('express')
const router = express.Router()
const Game = require('../models/game')
const alert = require('alert')
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({})
        res.render('index', {games: games})
    } catch {
        console.error('Error finding games')
    }
    
})
router.get('/credits', (req, res) => {
    alert('Created by Ethan van Bruchem, in 2021 \n Thanks for playing!')
    res.redirect('/')
})

module.exports = router