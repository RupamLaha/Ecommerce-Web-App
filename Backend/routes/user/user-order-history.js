const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /user/order-history
// user order history...
router.get('/',(req,res)=>{
    res.send({
        message: "User Order History"
    })
})

module.exports = router