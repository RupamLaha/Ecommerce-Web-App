const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /admin/orders
// all orders received...
router.get('/',(req,res)=>{
    res.send({
        message: "All orders received"
    })
})

module.exports = router