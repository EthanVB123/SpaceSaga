const express = require('express')
const router = express.Router()
const Game = require('../models/game')
const Player = require('../models/player')
const mongoose = require('mongoose')
const alert = require('alert')
const player = require('../models/player')

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
        res.redirect(`game/${newGame._id}`)
    /*} catch {
        res.redirect('/')
        console.error('Error creating Game')
    }*/
})

// Joined Game Route
router.get('/:id', async (req, res) => {
    const game = await Game.findById(req.params.id)
    const player1 = game.player1
    const player2 = game.player2
    const player3 = game.player3
    const player4 = game.player4
    /*let txt = `${game.name} <br>`
    txt += `Player 1: ${game.player1} <br>`
    txt += `Player 2: ${game.player2} <br>`
    txt += `Player 3: ${game.player3} <br>`
    txt += `Player 4: ${game.player4} <br>`
    txt += `Game: ${game}` // for testing only
    res.send(txt)*/
    res.render('games/gameone', {game: game, player1: player1, player2: player2, player3: player3, player4: player4})
})

// Edit Game Route - mainly used to add a player to the game

// Add Player Route - first two are for the password, second two are for adding the player
router.get('/:id/password', async (req, res) => {
    try {   
        const game = await Game.findById(req.params.id)
        res.render('games/password', {game: game})
    } catch {
        res.redirect('/')
    }
})
router.post('/:id/password', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        const gamePwd = game.password
        const givenPwd = req.body.password
        if (gamePwd == givenPwd) {
            res.redirect(`/game/${req.params.id}/edit`)
        } else {
            alert('Incorrect password!')
            console.error('Incorrect password')
            res.redirect('/')
        }
    } catch {
        console.error('Password post is stuffed')
        res.redirect('/')
    }
})
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
    let player
    //try {
        game = await Game.findById(req.params.id)
        player = await Player.findById(req.body.playerselect)
        game.name = game.name
        game.password = game.password
        if (game.player1 == undefined) {
            game.player1 = req.body.playerselect
            player.game = req.params.id
        } else {
            game.player1 = game.player1
            if (game.player2 == undefined) {
                if (req.body.playerselect == game.player1) {
                    alert('This player is already playing this game.')
                    res.redirect('/')
                } else {
                game.player2 = req.body.playerselect
                player.game = req.params.id
                }
            } else {
                game.player2 = game.player2
                if (game.player3 == undefined) {
                    if (req.body.playerselect == game.player1 || req.body.playerselect == game.player2) {
                        alert('This player is already playing this game.')
                        res.redirect('/')
                    } else {
                    game.player3 == req.body.playerselect
                    player.game = req.params.id
                    }
                } else {
                    game.player3 = game.player3
                    if (game.player4 == undefined) {
                        if (req.body.playerselect == game.player1 || req.body.playerselect == game.player2 || req.body.playerselect == game.player3) {
                            alert('This player is already playing this game.')
                            res.redirect('/')
                        } else {
                            game.player4 = req.body.playerselect
                            player.game = req.params.id
                        }
                    } else {
                        game.player4 = game.player4
                    }
                }
            }
        }
    
        await game.save()
        await player.save()
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

// Remove player from game
router.put('/:id/:n/remove', async (req, res) => { // n is an int from 1-4 inclusive - it is the player to discard
    let game
    let player
    //try {
        game = await Game.findById(req.params.id)
        if (req.params.n == 1) {
            player = await Player.findById(game.player1)
        } else if (req.params.n == 2) {
            player = await Player.findById(game.player2)
        } else if (req.params.n == 3) {
            player = await Player.findById(game.player3)
        } else if (req.params.n == 4) {
            player = await Player.findById(game.player4)
        }


        if (req.params.n == 1) {
            game.player1 = game.player2
            game.player2 = game.player3
            game.player3 = game.player4
            game.player4 = undefined
            if (player != undefined && player != null) {
            player.game = undefined
            }
        } else if (req.params.n == 2) {
            game.player1 = game.player1
            game.player2 = game.player3
            game.player3 = game.player4
            game.player4 = undefined
            if (player != undefined && player != null) {
                player.game = undefined
            }
        } else if (req.params.n == 3) {
            game.player1 = game.player1
            game.player2 = game.player2
            game.player3 = game.player4
            game.player4 = undefined
            if (player != undefined && player != null) {
                player.game = undefined
            }
        } else if (req.params.n == 4) {
            game.player1 = game.player1
            game.player2 = game.player2
            game.player3 = game.player3
            game.player4 = undefined
            if (player != undefined && player != null) {
                player.game = undefined
            }
        } else {
            alert('This player is not in the game')
            res.redirect('/')
        }
        await game.save()
        if (player != undefined && player != null) {
            await player.save()
        }
        res.redirect(`/game/${game.id}`)
            /*} catch {
        console.log('Error - games.js line 214')
        res.redirect('/')
    }*/
})
router.delete('/:id', async (req, res) => {
    let game
    try {
        game = await Game.findById(req.params.id)
        if (game.numberPlayers == 0) {
            await game.remove()
            res.redirect(`/`)
        } else {
            alert("You have some players remaining... You can't delete a game if there are still players in it.")
            res.redirect(`/game/${game.id}`)
        }
    } catch {
        if (game == null) {
            res.redirect('/')
        } else {
        res.redirect(`/game/${game.id}`)
        }
    }
})
module.exports = router