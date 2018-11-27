const express = require('express')
const router = express.Router()

const Nota = require('../models/nota');
const checkAdmin = require('../middleware/checkAdmin');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage, fileFilter})

router.get('/', (req, res) => {
    Nota.find().sort({ fecha: -1 })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/id/:notaId', (req, res) => {
    Nota.findById(req.params.notaId)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:categoria', (req, res) => {
    let categoria = req.params.categoria[0].toUpperCase() + req.params.categoria.substring(1)
    Nota.find({categoria: categoria})
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/', upload.single('imagen'), checkAdmin ,(req, res) => {
    const nota = new Nota({
        fecha: req.body.fecha,
        titulo: req.body.titulo,
        texto: req.body.texto,
        categoria: req.body.categoria,
        imagen: req.file ? req.file.path : null
    })
    nota.save()
    .then(result => {
        res.status(201).json({
            message: "Nota agregada con exito",
            nota: result
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router