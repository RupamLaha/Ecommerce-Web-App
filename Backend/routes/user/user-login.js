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

// /user/login
// user login authentication...
router.get('/:email/:pass',(req,res)=>{

    let query = `select email from users where email = '${req.params.email}' and password = '${req.params.pass}'`;

    connection.query(query, (err, result) => {
        if(err){
            console.log(err.message)
            var errRes = {
                code: err.code,
                message: err.message 
            }

            res.send(errRes)
        }else{

            var successRes = {
                code: 'success',
                message: result
            }

            res.send(successRes)
        }
    })
})

module.exports = router