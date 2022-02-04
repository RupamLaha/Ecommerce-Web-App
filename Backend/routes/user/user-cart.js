const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /user/cart
// user cart...
router.get('/',(req,res)=>{
    res.send({
        message: "User Cart"
    })
})

module.exports = router