const express = require('express')
const router = express.Router()
const Game = require('../models/game')
const Player = require('../models/player')
const alert = require('alert')
// Index route has list of players
router.get('/', async (req, res) => {
    try {
    players = await Player.find({})
    res.render('players/show', {players: players})
    } catch {
        alert('Error rendering list of players')
        res.redirect('/')       
    } 
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
        res.redirect(`setup`)
    } catch {
        alert('Error creating Player')
        res.redirect('/')
    }
})

// Delete Player Route
router.delete('/:id', async (req, res) => {
    let player
    try {
        player = await Player.findById(req.params.id)
        if (player.game == undefined || player.game == null) {await player.remove()}
        else {alert("You can't delete someone who is in a game.")}        
        res.redirect(`/setup`)
    } catch {
        if (player == null) {
            alert("You can't delete someone who does not exist.")
            res.redirect('/')
        } else {
            alert('An unknown error has occurred.')
            res.redirect(`/setup/${player.id}`)
        }

    }
})

module.exports = router