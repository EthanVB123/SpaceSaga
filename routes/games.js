const express = require('express')
const router = express.Router()
const Game = require('../models/game')
const Player = require('../models/player')
const mongoose = require('mongoose')

// Index route redirects to homepage
router.get('/', async (req, res) => {
    try {
        allGames = ''
        const games = await Game.find({})
        games.forEach(element => {
            allGames += element.name
            allGames += ' '
            allGames += element.password
            allGames += ' '
            allGames += element.numberPlayers
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
router.get('/:id', async (req, res) => {
    const game = await Game.findById(req.params.id)
    let txt = `${req.params.id} <br>`
    txt += `Player 1: ${game.player1} <br>`
    txt += `Player 2: ${game.player2} <br>`
    txt += `Player 3: ${game.player3} <br>`
    txt += `Player 4: ${game.player4} <br>`
    txt += `Game: ${game}` // for testing only
    res.send(txt)
})

// Edit Game Route - mainly used to add a player to the game

// Add Player Route
router.get('/:id/edit', async (req, res) => {
    try {
        const players = await Player.find({})
        const game = await Game.findById(req.params.id)//this is a reminder to future me to notice that this is the same id as was parsed in the url
        res.render('games/addplayer', {game: game, numberPlayers: game.numberPlayers, players: players})//this is specific to the add player action
    } catch {
        res.redirect('/game')
    }
})
router.put('/:id', async (req, res) => {
    let game
    //try {
        game = await Game.findById(req.params.id)
        game.name = game.name
        game.password = game.password
        if (game.player1 == undefined) {
            game.player1 = req.body.playerselect
        } else {
            game.player1 = game.player1
            if (game.player2 == undefined) {
                game.player2 = req.body.playerselect
            } else {
                game.player2 = game.player2
                if (game.player3 == undefined) {
                    game.player3 == req.body.playerselect
                } else {
                    game.player3 = game.player3
                    if (game.player4 == undefined) {
                        game.player4 = req.body.playerselect
                    } else {
                        game.player4 = game.player4
                    }
                }
            }
        }
    
        await game.save()
        res.redirect(`${game.id}`) 
    /*} catch {
        if (game == null) {
            res.redirect('/')
        } else {
        //res.redirect('/game/edit', {
        //    game: game,

        //}
        res.redirect('/')
        console.error('Error updating Game')}
    } */
})

module.exports = router