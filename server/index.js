require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

const router = require('./router/api-router')
const redirectRouter = require('./router/redirect-router')
const errorMiddleware = require('./middlewares/error-middleware')


const app = express()

const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(express.json())
app.use(cors())
app.use('/s', redirectRouter)
app.use('/api', router)
app.use(errorMiddleware)


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://mongo:mongo@cluster0.roihl.mongodb.net/skimpy-api-mern', { useUnifiedTopology: true })
        app.listen(PORT, ()=> console.log(`server started on port: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()