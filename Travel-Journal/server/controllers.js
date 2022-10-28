const Place = require('./models/placeModel')

const getPlaces = async(req,res) => {
    try {
        const places = await Place.find({}).sort({createdAt: -1})

        res.status(200).json(places)

    } catch (error) {
        res.json(error)
    }
}

const addPlace = async(req,res) => {
    const {placeName, countryName, description, fromDate, toDate, imageUrl, mapUrl} = req.body

    const place = await Place.create({
        placeName,countryName,description,fromDate,toDate,imageUrl, mapUrl
    })

    res.status(200).json(place)
}


module.exports = {
    getPlaces,
    addPlace,
}