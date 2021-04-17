const mongoose = require('mongoose')
const path = require('path')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

})

module.exports = mongoose.model('Player', playerSchema)