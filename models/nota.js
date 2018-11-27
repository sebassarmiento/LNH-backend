const mongoose = require('mongoose')

const notaSchema = mongoose.Schema({
    fecha: String,
    titulo: { type: String, required: true },
    texto: { type: String, required: true },
    categoria: { type: String, required: true },
    imagen: String 
})

module.exports = mongoose.model('Nota', notaSchema)