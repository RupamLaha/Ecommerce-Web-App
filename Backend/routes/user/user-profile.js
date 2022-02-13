const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

var connection = require('../../db_config')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /user/profile
// user profile...
router.get('/:id',(req,res)=>{

    let query = `select id, name, email, address from users where id = '${req.params.id}'`;

    connection.query(query, (err, result) => {
        if(err){
            console.log(err.message)
            var errRes = {
                code: err.code,
                message: err.message 
            }

            res.json(errRes)
        }else{

            var successRes = {
                code: 'success',
                message: result
            }

            res.json(successRes)
        }
    })
})

module.exports = router