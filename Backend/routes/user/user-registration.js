const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /user/registration
// user registration...
router.get('/',(req,res)=>{
    res.send({
        message: "Registration route"
    })
})

module.exports = router