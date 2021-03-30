const express = require('express')
const router = express.Router()
const game = require('../models/game')
const player = require('../models/player')

router.get('/', (req, res) => {
    res.redirect('/')
})
router.get('/:id', (req, res) => {
    res.send(`${req.params.id}'s Game`)
})

// New Player Route
router.get('/new', (req, res) => {
    res.render('players/new', {author: new Author()})
})


module.exports = router