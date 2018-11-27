
module.exports = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    if(req.body.username === 'rosarionovillodiaz@gmail.com' && req.body.password === 'ellibrodelasedades'){
        next()
    } else {
        res.status(401).json({message: "Invalid data"})
    }
}