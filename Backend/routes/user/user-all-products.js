const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /user/all-products
// show all the products...
router.get('/',(req,res)=>{
    res.send({
        message: "Show all products route"
    })
})

module.exports = router