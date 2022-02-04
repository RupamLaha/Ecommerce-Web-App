const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /admin/products
// all products...
router.get('/',(req,res)=>{
    res.send({
        message: "All products"
    })
})

module.exports = router