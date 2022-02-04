const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /admin/profile
// admin profile...
router.get('/',(req,res)=>{
    res.send({
        message: "Admin Profile"
    })
})

module.exports = router