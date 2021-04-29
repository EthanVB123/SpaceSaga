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
        ref: 'Player' 
    },
    player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player' 
    },
    player3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player' 
    },
    player4: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player' 
    },
    hasStarted: {
        type: Boolean,
        required: true,
        default: false
    }

})

gameSchema.virtual('numberPlayers').get(function() {
    var num = 0;
    if ((this.player1 != null)&&(this.player1 != undefined)) {
        num += 1;
    }
    if ((this.player2 != null)&&(this.player2 != undefined)) {
        num += 1;
    }
    if ((this.player3 != null)&&(this.player3 != undefined)) {
        num += 1;
    }
    if ((this.player4 != null)&&(this.player4 != undefined)) {
        num += 1;
    }
    return num
})

module.exports = mongoose.model('Game', gameSchema)