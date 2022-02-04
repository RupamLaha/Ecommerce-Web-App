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

// /user/order-history
// user order history by usedid...
router.get('/:id',(req,res)=>{

    let query = `select * from orders join products on orders.prodid = products.id where orders.userid = ${req.params.id}`;

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


// /user/order-history/add
// add to orders ...
// (buy order)...
router.post('/add/:userid/:prodid/:quantity',(req,res)=>{

    let query = `insert into orders (userid, prodid, orderstatus, quantity) values ('${req.params.userid}','${req.params.prodid}', '0', '${req.params.quantity}')`;

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