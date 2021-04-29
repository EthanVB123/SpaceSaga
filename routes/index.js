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
// I'm a teapot
router.get('/teapot', (req, res) => {
    res.sendStatus(418)
})
router.get('/clock', (req, res) => {
    var time = 0
    while (time < 100) {
    renderClock(time, res)
    msleep(1000)
    time += 1
    }
    
})
async function renderClock(time, res) {
    time += 1
    console.log(time)
    await res.render('clock/clock', {time: time})
}
function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
  }

module.exports = router