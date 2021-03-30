const mongoose = require('mongoose')
const path = require('path')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    // more later

})

module.exports = mongoose.model('Player', playerSchema)