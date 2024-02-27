const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    shortRandom:{
        type: String,
        required: true
    },
    done:{
        type: Boolean
    }
})

module.exports = mongoose.model('Urls', urlSchema)