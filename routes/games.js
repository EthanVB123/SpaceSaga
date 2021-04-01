const express = require('express')
const router = express.Router()
const Game = require('../models/game')
const Player = require('../models/player')

// Index route redirects to homepage
router.get('/', async (req, res) => {
    try {
        allGames = ''
        const games = await Game.find({})
        games.forEach(element => {
            allGames += element.name
            allGames += ' '
            allGames += element.password
            allGames += '<br>'
        });
        res.send(allGames)
    } catch {
        res.redirect('/')
        console.error('Error with index route')        
    } 
})

// New Game Route
router.get('/new', (req, res) => {
    res.render('games/new', {game: new Game()})
})

router.post('/', async (req, res) => {
    const game = new Game({
        name: req.body.name,
        password: req.body.password
    })
    //try {
        const newGame = await game.save()
        res.redirect(`game/${newGame.name}`)
    /*} catch {
        res.redirect('/')
        console.error('Error creating Game')
    }*/
})


// I'm a teapot
router.get('/teapot', (req, res) => {
    res.sendStatus(418)
})

// Joined Game Route
router.get('/:id', (req, res) => {
    res.send(`${req.params.id}'s Game`)
})

module.exports = router