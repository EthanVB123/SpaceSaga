const express = require('express')
const router = express.Router()
const game = require('../models/game')
const Player = require('../models/player')

// Index route redirects to homepage
router.get('/', async (req, res) => {
    //try {
        allPlayerNames = ''
        const players = await Player.find({})
        players.forEach(element => {
            allPlayerNames += element.name
            allPlayerNames += ' '
        });
        res.send(allPlayerNames)
    //} catch {
        //res.redirect('/')
        //console.error('Error with index route')        
    //} 
})

// New Player Route
router.get('/new', (req, res) => {
    res.render('players/new', {player: new Player()})
})

router.post('/', async (req, res) => {
    const player = new Player({
        name: req.body.name
    })
    try {
        const newPlayer = await player.save()
        res.redirect(`setup/${newPlayer.name}`)
    } catch {
        res.redirect('/')
        console.error('Error creating Player')
    }
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