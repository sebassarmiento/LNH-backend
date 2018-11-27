const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const notasRouter = require('./routes/notasRouter');
const loginRouter = require('./routes/loginRouter');

mongoose.connect('mongodb+srv://sebastian:sarmiento@cluster0-ok6xa.mongodb.net/revista?retryWrites=true', {useNewUrlParser: true})

app.use(express.json())
app.use(cors())

app.use('/notas', notasRouter)
app.use('/login', loginRouter)

app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: error.message
    })
})

module.exports = app