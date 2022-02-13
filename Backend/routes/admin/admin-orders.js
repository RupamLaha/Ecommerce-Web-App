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

// /admin/orders
// all orders received...
router.get('/',(req,res)=>{

    let query = `select *, orders.id orderId, users.name uname, products.name pname from orders join users on orders.userid = users.id join products on orders.prodid = products.id`;

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

// /admin/orders
// update order status by orderid...
router.put('/update-status/',(req,res)=>{

    // :orderid/:status

    let orderId = req.body.orderId
    let status = req.body.status

    let query = `UPDATE orders SET orderstatus = '${status}' WHERE id = '${orderId}'`;

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