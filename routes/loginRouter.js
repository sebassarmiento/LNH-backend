const express = require('express')
const router = express.Router()

const Nota = require('../models/nota');

router.post('/' ,(req, res) => {
    if(req.body.username === 'rosarionovillodiaz@gmail.com' && req.body.password === 'ellibrodelasedades' ){
        res.status(200).json({
            message: "Login successfull"
        })
    } else {
        res.status(500).json({
            message: "Login failed",
        })
    }
})

module.exports = router