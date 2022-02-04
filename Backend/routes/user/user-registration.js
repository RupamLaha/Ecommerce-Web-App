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

// /user/registration
// user registration...
router.post('/:name/:email/:pass/:address',(req,res)=>{

    // name email password address
    let query = `insert into users (name, email, password, address) values ('${req.params.name}','${req.params.email}','${req.params.pass}', '${req.params.address}')`;

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