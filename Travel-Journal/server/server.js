const express = require('express')
const {connectDB} = require('./config/db')
const cors = require('cors')
require('dotenv').config()

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/place', require('./routes'))

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))

