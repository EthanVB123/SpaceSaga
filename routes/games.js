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
router.get('/:id', (req, res) => {
    res.send(`${req.params.id}'s Game`)
})

// Edit Game Route - mainly used to add a player to the game

// Add Player Route
router.get('/:id/edit', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)//this is a reminder to future me to notice that this is the same id as was parsed in the url
        res.render('games/addplayer', {game: game, numberPlayers: game.numberPlayers})//this is specific to the add player action
    } catch {
        res.redirect('/game')
    }
})
router.put('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`${author.id}`)
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
        res.render('/authors/edit', {
            author: author,
            errorMessage: 'Error updating Author'
        })}
    }
})

module.exports = router