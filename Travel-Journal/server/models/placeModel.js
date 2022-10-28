const mongoose = require('mongoose')

const placeSchema = mongoose.Schema({
    placeName: String,
    countryName: String,
    description: String,
    fromDate: String,
    toDate: String,
    imageUrl: String
}, {timestamps: true})

module.exports = mongoose.model('Place', placeSchema)