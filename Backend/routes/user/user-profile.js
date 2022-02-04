const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /user/profile
// user profile...
router.get('/',(req,res)=>{
    res.send({
        message: "User Profile"
    })
})

module.exports = router