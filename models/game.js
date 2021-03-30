const mongoose = require('mongoose')
const path = require('path')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    /*maxPlayers: {
        type: Number,
        required: true
    }, */ // Implement this later - for now is always 4
    player1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player' 
    },
    player2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player' 
    },
    player3: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player' 
    },
    player4: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player' 
    }

})

module.exports = mongoose.model('Game', gameSchema)