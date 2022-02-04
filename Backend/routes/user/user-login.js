const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /user/login
// login authentication...
router.get('/',(req,res)=>{
    res.send({
        message: "Login route"
    })
})

module.exports = router